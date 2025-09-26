import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { MenuItem } from '@shared/types';
import { MenuItemForm } from '@/components/operations/MenuItemForm';
import { toast } from 'sonner';
import { useApi } from '@/hooks/use-api';
import { api } from '@/lib/api-client';
import { DataTableSkeleton } from '@/components/DataTableSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
export const MenuManagementPage: React.FC = () => {
  const { data: menuItems, isLoading, refetch } = useApi<MenuItem[]>('/api/menu-items');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const handleAddItem = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };
  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };
  const handleDeleteItem = async (id: string) => {
    const toastId = toast.loading('Deleting menu item...');
    try {
      await api(`/api/menu-items/${id}`, { method: 'DELETE' });
      toast.success('Menu item deleted successfully.', { id: toastId });
      refetch();
    } catch (error) {
      toast.error('Failed to delete menu item.', { id: toastId, description: error instanceof Error ? error.message : 'Unknown error' });
    }
  };
  const handleFormSubmit = async (data: MenuItem) => {
    setIsSubmitting(true);
    const toastId = toast.loading(editingItem ? 'Updating menu item...' : 'Adding new menu item...');
    try {
      if (editingItem) {
        await api(`/api/menu-items/${data.id}`, { method: 'PUT', body: JSON.stringify(data) });
      } else {
        await api('/api/menu-items', { method: 'POST', body: JSON.stringify(data) });
      }
      toast.success(`Menu item ${editingItem ? 'updated' : 'added'} successfully.`, { id: toastId });
      refetch();
      setIsFormOpen(false);
      setEditingItem(null);
    } catch (error) {
      toast.error(`Failed to ${editingItem ? 'update' : 'add'} menu item.`, { id: toastId, description: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsSubmitting(false);
    }
  };
  const renderContent = () => {
    if (isLoading) {
      return <DataTableSkeleton columns={5} />;
    }
    if (!menuItems || menuItems.length === 0) {
      return (
        <EmptyState
          title="No Menu Items Found"
          description="Get started by adding your first dish."
          actionText="Add Menu Item"
          onActionClick={handleAddItem}
        />
      );
    }
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="hidden md:table-cell">Price</TableHead>
            <TableHead><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="hidden sm:table-cell">
                <img alt={item.name} className="aspect-square rounded-md object-cover" height="64" src={item.imageUrl} width="64" />
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
              <TableCell className="hidden md:table-cell">${item.price.toFixed(2)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEditItem(item)}>Edit</DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-red-500 focus:text-red-500">Delete</button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the menu item.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteItem(item.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
        <Button onClick={handleAddItem}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Menu Item
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
          <CardDescription>Manage your restaurant's dishes.</CardDescription>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
      <MenuItemForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        isSubmitting={isSubmitting}
      />
    </>
  );
};