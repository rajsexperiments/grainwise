import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { CorporateClient, MealPlan } from '@shared/types';
const clientSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  adminContact: z.object({
    name: z.string().min(1, 'Contact name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
  }),
  mealPlanId: z.string().min(1, 'Meal plan is required'),
  employeeCount: z.coerce.number().int().positive('Must be a positive number'),
  status: z.enum(['Active', 'Inactive']),
});
type ClientFormValues = z.infer<typeof clientSchema>;
interface CorporateClientFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: CorporateClient) => void;
  initialData?: CorporateClient | null;
  isSubmitting: boolean;
  mealPlans: MealPlan[];
}
export const CorporateClientForm: React.FC<CorporateClientFormProps> = ({ isOpen, onOpenChange, onSubmit, initialData, isSubmitting, mealPlans }) => {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      companyName: '',
      adminContact: { name: '', email: '', phone: '' },
      mealPlanId: '',
      employeeCount: 0,
      status: 'Active',
    },
  });
  React.useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset(initialData);
      } else {
        form.reset({
          companyName: '',
          adminContact: { name: '', email: '', phone: '' },
          mealPlanId: '',
          employeeCount: 0,
          status: 'Active',
        });
      }
    }
  }, [initialData, form, isOpen]);
  const handleFormSubmit = (data: ClientFormValues) => {
    const processedData: CorporateClient = {
      ...data,
      id: initialData?.id || crypto.randomUUID(),
      startDate: initialData?.startDate || Date.now(),
    };
    onSubmit(processedData);
  };
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{initialData ? 'Edit Corporate Client' : 'Add New Client'}</SheetTitle>
          <SheetDescription>
            Fill in the details for the corporate client. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <FormField control={form.control} name="companyName" render={({ field }) => (
              <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="adminContact.name" render={({ field }) => (
              <FormItem><FormLabel>Contact Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="adminContact.email" render={({ field }) => (
              <FormItem><FormLabel>Contact Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="adminContact.phone" render={({ field }) => (
              <FormItem><FormLabel>Contact Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="employeeCount" render={({ field }) => (
              <FormItem><FormLabel>Employee Count</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="mealPlanId" render={({ field }) => (
              <FormItem><FormLabel>Meal Plan</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a meal plan" /></SelectTrigger></FormControl>
                <SelectContent>
                  {mealPlans.map(plan => <SelectItem key={plan.id} value={plan.id}>{plan.name}</SelectItem>)}
                </SelectContent>
              </Select><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem><FormLabel>Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select><FormMessage /></FormItem>
            )} />
            <SheetFooter>
              <SheetClose asChild><Button type="button" variant="outline">Cancel</Button></SheetClose>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Changes'}</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};