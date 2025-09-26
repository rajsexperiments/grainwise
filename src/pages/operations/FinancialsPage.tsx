import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { ArrowUpRight, ArrowDownLeft, DollarSign, PlusCircle } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';
import { useApi } from '@/hooks/use-api';
import { FinancialTransaction } from '@shared/types';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/EmptyState';
import { AddExpenseForm } from '@/components/operations/AddExpenseForm';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
export const FinancialsPage: React.FC = () => {
  const { data: transactions, isLoading, refetch } = useApi<FinancialTransaction[]>('/api/financials');
  const [isExpenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const { totalRevenue, totalExpenses, netProfit, salesData } = React.useMemo(() => {
    if (!transactions) {
      return { totalRevenue: 0, totalExpenses: 0, netProfit: 0, salesData: [] };
    }
    const totalRevenue = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
    const netProfit = totalRevenue - totalExpenses;
    const monthlySales: { [key: string]: number } = {};
    transactions.filter(t => t.type === 'Income').forEach(t => {
      const month = new Date(t.date).toLocaleString('default', { month: 'short' });
      monthlySales[month] = (monthlySales[month] || 0) + t.amount;
    });
    const salesData = Object.entries(monthlySales).map(([name, total]) => ({ name, total })).slice(-6); // Last 6 months
    return { totalRevenue, totalExpenses, netProfit, salesData };
  }, [transactions]);
  const handleExpenseAdded = (expenseData: { description: string; amount: number; category: FinancialTransaction['category']; }) => {
    const promise = api('/api/financials', {
      method: 'POST',
      body: JSON.stringify({
        ...expenseData,
        date: Date.now(),
        type: 'Expense',
      }),
    });
    toast.promise(promise, {
      loading: 'Adding expense...',
      success: () => {
        refetch();
        setExpenseDialogOpen(false);
        return 'Expense added successfully!';
      },
      error: 'Failed to add expense.',
    });
  };
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Financials</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card><CardHeader><Skeleton className="h-5 w-32" /></CardHeader><CardContent><Skeleton className="h-8 w-24" /></CardContent></Card>
          <Card><CardHeader><Skeleton className="h-5 w-32" /></CardHeader><CardContent><Skeleton className="h-8 w-24" /></CardContent></Card>
          <Card><CardHeader><Skeleton className="h-5 w-32" /></CardHeader><CardContent><Skeleton className="h-8 w-24" /></CardContent></Card>
        </div>
        <Card><CardContent className="pt-6"><Skeleton className="h-[350px] w-full" /></CardContent></Card>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Financials</h1>
        <Dialog open={isExpenseDialogOpen} onOpenChange={setExpenseDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>
                Log a new business expense to keep your records up to date.
              </DialogDescription>
            </DialogHeader>
            <AddExpenseForm onFormSubmit={handleExpenseAdded} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">+5.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold", netProfit >= 0 ? "text-green-600" : "text-red-600")}>
              ${netProfit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
            <p className="text-xs text-muted-foreground">Analysis of profitability</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales performance.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <Bar dataKey="total" fill="hsl(var(--harvest-gold))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>A log of recent income and expenses.</CardDescription>
          </CardHeader>
          <CardContent>
            {!transactions || transactions.length === 0 ? (
              <EmptyState title="No Transactions" description="Transactions will appear here." />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(0, 5).map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>
                        <div className="font-medium">{t.description}</div>
                        <div className="text-sm text-muted-foreground">{t.category}</div>
                      </TableCell>
                      <TableCell className={cn("text-right font-semibold", t.type === 'Income' ? 'text-green-600' : 'text-red-600')}>
                        {t.type === 'Income' ? '+' : '-'}${t.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};