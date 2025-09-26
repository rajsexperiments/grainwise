import React from 'react';
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Order, OrderStatus } from '@shared/types';
import { cn } from '@/lib/utils';
import { useApi } from '@/hooks/use-api';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/EmptyState';
const statusColors: Record<OrderStatus, string> = {
  Pending: 'bg-yellow-500',
  'In Progress': 'bg-blue-500',
  'Out for Delivery': 'bg-purple-500',
  Completed: 'bg-green-500',
};
const OrderCard = ({ order }: { order: Order }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: order.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="mb-4 bg-card hover:shadow-md cursor-grab active:cursor-grabbing">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <p className="font-bold text-sm">{order.customerName}</p>
            <p className="text-xs text-muted-foreground">#{order.id.slice(0, 6)}</p>
          </div>
          <p className="text-xs text-muted-foreground">{order.items.length} items</p>
          <p className="text-right font-semibold mt-2">${order.total.toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  );
};
const OrderColumn = ({ title, orders }: { title: OrderStatus; orders: Order[] }) => {
  return (
    <Card className="w-full md:w-1/4 bg-muted/50 flex-shrink-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className={cn('w-3 h-3 rounded-full', statusColors[title])}></span>
          {title}
          <Badge variant="secondary" className="ml-auto">{orders.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[60vh] overflow-y-auto">
        <SortableContext items={orders.map(o => o.id)} strategy={verticalListSortingStrategy}>
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </SortableContext>
      </CardContent>
    </Card>
  );
};
export const OrdersPage: React.FC = () => {
  const { data: orders, setData: setOrders, isLoading } = useApi<Order[]>('/api/orders');
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !orders) return;
    const activeOrder = orders.find(o => o.id === active.id);
    if (!activeOrder) return;
    const overColumnId = over.id.toString();
    const newStatus = columns.find(col => orders.some(o => o.id === overColumnId && o.status === col) || col === overColumnId);
    if (newStatus && activeOrder.status !== newStatus) {
      const originalOrders = [...orders];
      const updatedOrders = orders.map(o => o.id === active.id ? { ...o, status: newStatus } : o);
      setOrders(updatedOrders);
      try {
        await api(`/api/orders/${active.id}`, {
          method: 'PUT',
          body: JSON.stringify({ ...activeOrder, status: newStatus }),
        });
        toast.success(`Order #${activeOrder.id.slice(0,6)} moved to ${newStatus}`);
      } catch (error) {
        setOrders(originalOrders);
        toast.error('Failed to update order status.', { description: error instanceof Error ? error.message : 'Unknown error' });
      }
    }
  };
  const columns: OrderStatus[] = ['Pending', 'In Progress', 'Out for Delivery', 'Completed'];
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
        <div className="flex flex-col md:flex-row gap-4">
          {columns.map(col => (
            <div key={col} className="w-full md:w-1/4">
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-24 w-full mb-4" />
              <Skeleton className="h-24 w-full mb-4" />
              <Skeleton className="h-24 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (!orders || orders.length === 0) {
    return (
       <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
        <EmptyState title="No Orders Found" description="New orders will appear here as they come in." />
      </div>
    )
  }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-col md:flex-row gap-4">
          {columns.map(status => (
            <SortableContext key={status} items={orders.filter(o => o.status === status).map(o => o.id)} id={status}>
              <OrderColumn
                title={status}
                orders={orders.filter(o => o.status === status)}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
};