import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { MenuItem } from '@shared/types';
const menuItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  category: z.enum(['Breakfast', 'Brunch', 'Lunch']),
  subCategory: z.enum(['Porridge', 'Savory Pancake', 'Power Bowl', 'Salad']),
  imageUrl: z.string().url('Must be a valid URL'),
  ingredients: z.string().min(1, 'Ingredients are required'),
  nutrition: z.object({
    calories: z.coerce.number().int().min(0),
    protein: z.coerce.number().int().min(0),
    isGlutenFree: z.boolean(),
  }),
  story: z.string().optional(),
});
type MenuItemFormValues = z.infer<typeof menuItemSchema>;
interface MenuItemFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: MenuItem) => void;
  initialData?: MenuItem | null;
  isSubmitting: boolean;
}
export const MenuItemForm: React.FC<MenuItemFormProps> = ({ isOpen, onOpenChange, onSubmit, initialData, isSubmitting }) => {
  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: 'Lunch',
      subCategory: 'Power Bowl',
      imageUrl: '',
      ingredients: '',
      nutrition: {
        calories: 0,
        protein: 0,
        isGlutenFree: false,
      },
      story: '',
    },
  });
  React.useEffect(() => {
    if (isOpen) {
        if (initialData) {
            form.reset({
                ...initialData,
                ingredients: initialData.ingredients.join(', '),
            });
        } else {
            form.reset({
                name: '',
                description: '',
                price: 0,
                category: 'Lunch',
                subCategory: 'Power Bowl',
                imageUrl: '',
                ingredients: '',
                nutrition: {
                    calories: 0,
                    protein: 0,
                    isGlutenFree: false,
                },
                story: '',
            });
        }
    }
  }, [initialData, form, isOpen]);
  const handleFormSubmit = (data: MenuItemFormValues) => {
    const processedData: MenuItem = {
      ...data,
      id: initialData?.id || crypto.randomUUID(),
      ingredients: data.ingredients.split(',').map(s => s.trim()),
    };
    onSubmit(processedData);
  };
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{initialData ? 'Edit Menu Item' : 'Add New Menu Item'}</SheetTitle>
          <SheetDescription>
            Fill in the details for the menu item. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Brunch">Brunch</SelectItem>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                </SelectContent>
              </Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="subCategory" render={({ field }) => (
              <FormItem><FormLabel>Sub-category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a sub-category" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="Porridge">Porridge</SelectItem>
                  <SelectItem value="Savory Pancake">Savory Pancake</SelectItem>
                  <SelectItem value="Power Bowl">Power Bowl</SelectItem>
                  <SelectItem value="Salad">Salad</SelectItem>
                </SelectContent>
              </Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="imageUrl" render={({ field }) => (
              <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="ingredients" render={({ field }) => (
              <FormItem><FormLabel>Ingredients (comma-separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="nutrition.calories" render={({ field }) => (
              <FormItem><FormLabel>Calories</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="nutrition.protein" render={({ field }) => (
              <FormItem><FormLabel>Protein (g)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="nutrition.isGlutenFree" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <div className="space-y-1 leading-none"><FormLabel>Gluten-Free</FormLabel></div>
              </FormItem>
            )} />
            <FormField control={form.control} name="story" render={({ field }) => (
              <FormItem><FormLabel>Story</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <SheetFooter>
              <SheetClose asChild><Button type="button" variant="outline">Cancel</Button></SheetClose>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save changes'}</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};