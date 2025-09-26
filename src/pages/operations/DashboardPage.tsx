import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Package, Users, Utensils, Bell, AlertTriangle } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { mockOrders } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
const salesData = [
  { name: 'Mon', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Tue', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Wed', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Thu', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Fri', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Sat', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Sun', total: Math.floor(Math.random() * 5000) + 1000 },
];
const notifications = [
    { id: 1, icon: AlertTriangle, text: "Low stock warning for 'Buckwheat Flour'.", time: "5m ago", color: "text-yellow-500" },
    { id: 2, icon: Package, text: "Large order #ORD-005 received from Ethan Hunt.", time: "1h ago", color: "text-blue-500" },
    { id: 3, icon: AlertTriangle, text: "Low stock warning for 'Tomatoes'.", time: "3h ago", color: "text-yellow-500" },
];
export const DashboardPage: React.FC = () => {
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = mockOrders.length;
  const newCustomers = new Set(mockOrders.map(o => o.customerName)).size;
  const topSellingItem = "Mediterranean Quinoa Bowl"; // Mock data
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalOrders}</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newCustomers}</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Selling Item</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">{topSellingItem}</div>
            <p className="text-xs text-muted-foreground">Lunch Category</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={salesData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Bar dataKey="total" fill="hsl(var(--harvest-gold))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div className="col-span-3 grid grid-rows-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Top 5 recent orders.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                    {mockOrders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center">
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{order.customerName}</p>
                            <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                        </div>
                        <div className="ml-auto font-medium">+${order.total.toFixed(2)}</div>
                        </div>
                    ))}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Notification Center</CardTitle>
                    <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {notifications.map(n => (
                            <div key={n.id} className="flex items-start gap-3">
                                <n.icon className={`h-4 w-4 mt-1 flex-shrink-0 ${n.color}`} />
                                <div className="text-sm">
                                    <p className="leading-tight">{n.text}</p>
                                    <p className="text-xs text-muted-foreground">{n.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};