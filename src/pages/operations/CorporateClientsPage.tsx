import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { mockMealPlans } from '@/lib/mock-data';
import { useApi } from '@/hooks/use-api';
import { CorporateClient } from '@shared/types';
import { DataTableSkeleton } from '@/components/DataTableSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { CorporateClientForm } from '@/components/operations/CorporateClientForm';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
export const CorporateClientsPage: React.FC = () => {
  const { data: clients, isLoading, refetch } = useApi<CorporateClient[]>('/api/corporate-clients');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingClient, setEditingClient] = useState<CorporateClient | null>(null);
  const mealPlansById = new Map(mockMealPlans.map(p => [p.id, p.name]));
  const handleAddClient = () => {
    setEditingClient(null);
    setIsFormOpen(true);
  };
  const handleEditClient = (client: CorporateClient) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };
  const handleDeleteClient = async (id: string) => {
    const toastId = toast.loading('Deleting client...');
    try {
      await api(`/api/corporate-clients/${id}`, { method: 'DELETE' });
      toast.success('Client deleted successfully.', { id: toastId });
      refetch();
    } catch (error) {
      toast.error('Failed to delete client.', { id: toastId, description: error instanceof Error ? error.message : 'Unknown error' });
    }
  };
  const handleFormSubmit = async (data: CorporateClient) => {
    setIsSubmitting(true);
    const toastId = toast.loading(editingClient ? 'Updating client...' : 'Adding new client...');
    try {
      if (editingClient) {
        await api(`/api/corporate-clients/${data.id}`, { method: 'PUT', body: JSON.stringify(data) });
      } else {
        await api('/api/corporate-clients', { method: 'POST', body: JSON.stringify(data) });
      }
      toast.success(`Client ${editingClient ? 'updated' : 'added'} successfully.`, { id: toastId });
      refetch();
      setIsFormOpen(false);
      setEditingClient(null);
    } catch (error) {
      toast.error(`Failed to ${editingClient ? 'update' : 'add'} client.`, { id: toastId, description: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsSubmitting(false);
    }
  };
  const renderContent = () => {
    if (isLoading) {
      return <DataTableSkeleton columns={5} />;
    }
    if (!clients || clients.length === 0) {
      return (
        <EmptyState
          title="No Corporate Clients"
          description="Add your first corporate partner to get started."
          actionText="Add New Client"
          onActionClick={handleAddClient}
        />
      );
    }
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Employees</TableHead>
            <TableHead><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.companyName}</TableCell>
              <TableCell>
                <div className="font-medium">{client.adminContact.name}</div>
                <div className="text-sm text-muted-foreground">{client.adminContact.email}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant={client.status === 'Active' ? 'default' : 'destructive'} className={cn(client.status === 'Active' && 'bg-green-500 hover:bg-green-600')}>
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{client.employeeCount}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEditClient(client)}>Edit</DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-red-500 focus:text-red-500">Delete</button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the client record.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteClient(client.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Corporate Clients</h1>
          <Button onClick={handleAddClient}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Client
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Client Accounts</CardTitle>
            <CardDescription>Manage your corporate wellness partners.</CardDescription>
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </div>
      <CorporateClientForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        initialData={editingClient}
        isSubmitting={isSubmitting}
        mealPlans={mockMealPlans}
      />
    </>
  );
};