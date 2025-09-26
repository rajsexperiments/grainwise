import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useApi } from '@/hooks/use-api';
import { InventoryItem, Supplier } from '@shared/types';
import { DataTableSkeleton } from '@/components/DataTableSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { CreatePurchaseOrderForm } from '@/components/operations/CreatePurchaseOrderForm';
import { PlusCircle } from 'lucide-react';
export const InventoryPage: React.FC = () => {
  const { data: inventoryItems, isLoading: isLoadingInventory } = useApi<InventoryItem[]>('/api/inventory-items');
  const { data: suppliers, isLoading: isLoadingSuppliers } = useApi<Supplier[]>('/api/suppliers');
  const [isPoDialogOpen, setPoDialogOpen] = useState(false);
  const suppliersById = React.useMemo(() => {
    if (!suppliers) return new Map();
    return new Map(suppliers.map(s => [s.id, s.name]));
  }, [suppliers]);
  const isLoading = isLoadingInventory || isLoadingSuppliers;
  const renderContent = () => {
    if (isLoading) {
      return <DataTableSkeleton columns={5} />;
    }
    if (!inventoryItems || inventoryItems.length === 0) {
      return (
        <EmptyState
          title="No Inventory Items"
          description="Your inventory is empty. Add items to start tracking."
        />
      );
    }
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient</TableHead>
            <TableHead>Current Stock</TableHead>
            <TableHead className="hidden md:table-cell">Unit</TableHead>
            <TableHead className="hidden md:table-cell">Supplier</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryItems.map((item) => {
            const isLowStock = item.stockLevel <= item.lowStockThreshold;
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.stockLevel}</TableCell>
                <TableCell className="hidden md:table-cell">{item.unit}</TableCell>
                <TableCell className="hidden md:table-cell">{suppliersById.get(item.supplierId) || 'N/A'}</TableCell>
                <TableCell>
                  <Badge variant={isLowStock ? 'destructive' : 'default'} className={cn(!isLowStock && 'bg-green-500 hover:bg-green-600')}>
                    {isLowStock ? 'Low Stock' : 'In Stock'}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <Dialog open={isPoDialogOpen} onOpenChange={setPoDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Purchase Order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Purchase Order</DialogTitle>
              <DialogDescription>
                Select a supplier and list the items you need to order.
              </DialogDescription>
            </DialogHeader>
            {suppliers ? (
              <CreatePurchaseOrderForm suppliers={suppliers} onFormSubmit={() => setPoDialogOpen(false)} />
            ) : (
              <p>Loading suppliers...</p>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Stock Levels</CardTitle>
          <CardDescription>Monitor and manage your ingredient inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
};