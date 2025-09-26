import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Supplier } from '@shared/types';
const poSchema = z.object({
  supplierId: z.string().min(1, 'Supplier is required'),
  items: z.string().min(3, 'Please list items to order'),
});
type PurchaseOrderFormValues = z.infer<typeof poSchema>;
interface CreatePurchaseOrderFormProps {
  suppliers: Supplier[];
  onFormSubmit: () => void;
}
export const CreatePurchaseOrderForm: React.FC<CreatePurchaseOrderFormProps> = ({ suppliers, onFormSubmit }) => {
  const form = useForm<PurchaseOrderFormValues>({
    resolver: zodResolver(poSchema),
    defaultValues: {
      supplierId: '',
      items: '',
    },
  });
  const onSubmit = (data: PurchaseOrderFormValues) => {
    const supplierName = suppliers.find(s => s.id === data.supplierId)?.name || 'the selected supplier';
    toast.success('Purchase Order Sent!', {
      description: `A PO for "${data.items}" has been sent to ${supplierName}.`,
    });
    onFormSubmit();
    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="supplierId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a supplier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {suppliers.map(supplier => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Items to Order</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 20kg Quinoa, 50 units Avocado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit">Send Purchase Order</Button>
        </div>
      </form>
    </Form>
  );
};