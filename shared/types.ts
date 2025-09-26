export type ApiResponse<T = unknown> = { success: true; data: T } | { success: false; error: string };
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Kitchen Manager' | 'Finance Manager' | 'Corporate Client Admin';
}
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'Breakfast' | 'Brunch' | 'Lunch';
  subCategory: 'Porridge' | 'Savory Pancake' | 'Power Bowl' | 'Salad';
  imageUrl: string;
  price: number;
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: number;
    isGlutenFree: boolean;
  };
  story?: string;
}
export interface CorporateLead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: number;
}
export type OrderStatus = 'Pending' | 'In Progress' | 'Out for Delivery' | 'Completed';
export interface Order {
  id: string;
  customerName: string;
  items: { menuItemId: string; quantity: number }[];
  total: number;
  status: OrderStatus;
  createdAt: number;
}
export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  phone: string;
  email: string;
}
export interface InventoryItem {
  id: string;
  name: string;
  stockLevel: number;
  unit: 'kg' | 'g' | 'liters' | 'ml' | 'units';
  lowStockThreshold: number;
  supplierId: string;
}
export interface MealPlan {
  id: string;
  name: string; // e.g., "Weekly Lunch Plan"
  mealsPerWeek: number;
  pricePerMeal: number;
  isActive: boolean;
}
export interface CorporateClient {
  id: string;
  companyName: string;
  adminContact: {
    name: string;
    email: string;
    phone: string;
  };
  mealPlanId: string;
  employeeCount: number;
  startDate: number;
  status: 'Active' | 'Inactive';
}
export interface FinancialTransaction {
  id: string;
  date: number;
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  category: 'Sales' | 'Supplies' | 'Utilities' | 'Marketing';
  relatedOrderId?: string;
  relatedClientId?: string;
}