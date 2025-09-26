import { MenuItem, Order, Supplier, InventoryItem, CorporateClient, MealPlan, FinancialTransaction } from '@shared/types';
export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Sunrise Millet Porridge',
    description: 'A warm and comforting start to your day, packed with fiber and essential nutrients.',
    category: 'Breakfast',
    subCategory: 'Porridge',
    imageUrl: 'https://images.unsplash.com/photo-1595822593399-35f3875a4d3a?q=80&w=800&auto=format&fit=crop',
    price: 8.50,
    ingredients: ['Foxtail Millet', 'Almond Milk', 'Berries', 'Maple Syrup', 'Cinnamon'],
    nutrition: { calories: 350, protein: 10, isGlutenFree: true },
    story: 'Foxtail millet is an ancient grain known for its blood sugar balancing properties.'
  },
  {
    id: '2',
    name: 'Savory Buckwheat Pancakes',
    description: 'Light, fluffy, and gluten-free pancakes served with a side of avocado and spiced yogurt.',
    category: 'Breakfast',
    subCategory: 'Savory Pancake',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=800&auto=format&fit=crop',
    price: 12.00,
    ingredients: ['Buckwheat Flour', 'Herbs', 'Spices', 'Avocado', 'Greek Yogurt'],
    nutrition: { calories: 420, protein: 15, isGlutenFree: true },
    story: 'Despite its name, buckwheat is not related to wheat and is a fantastic source of high-quality protein.'
  },
  {
    id: '3',
    name: 'Mediterranean Quinoa Bowl',
    description: 'A vibrant and flavorful bowl with quinoa, chickpeas, cucumber, tomatoes, and a lemon-tahini dressing.',
    category: 'Lunch',
    subCategory: 'Power Bowl',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    price: 14.50,
    ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Tomatoes', 'Olives', 'Tahini Dressing'],
    nutrition: { calories: 550, protein: 20, isGlutenFree: true },
    story: 'Quinoa is a complete protein, containing all nine essential amino acids.'
  },
  {
    id: '4',
    name: 'Spiced Lentil & Millet Salad',
    description: 'A hearty and nutritious salad with a mix of lentils, pearl millet, roasted vegetables, and a tangy vinaigrette.',
    category: 'Lunch',
    subCategory: 'Salad',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop',
    price: 13.00,
    ingredients: ['Pearl Millet', 'Lentils', 'Roasted Carrots', 'Bell Peppers', 'Vinaigrette'],
    nutrition: { calories: 480, protein: 18, isGlutenFree: true },
    story: 'Pearl millet is rich in iron and zinc, essential for energy and immune function.'
  },
  {
    id: '5',
    name: 'Avocado Toast on Sorghum Bread',
    description: 'A classic brunch favorite with a twist, served on our house-made gluten-free sorghum bread.',
    category: 'Brunch',
    subCategory: 'Power Bowl',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop',
    price: 11.50,
    ingredients: ['Sorghum Bread', 'Avocado', 'Chili Flakes', 'Radish', 'Microgreens'],
    nutrition: { calories: 380, protein: 9, isGlutenFree: true },
    story: 'Sorghum is a drought-resistant grain, making it a sustainable and eco-friendly choice.'
  },
  {
    id: '6',
    name: 'Golden Turmeric Amaranth Porridge',
    description: 'An anti-inflammatory powerhouse porridge with amaranth, turmeric, ginger, and coconut milk.',
    category: 'Breakfast',
    subCategory: 'Porridge',
    imageUrl: 'https://images.unsplash.com/photo-1627522254412-fb9b35628c31?q=80&w=800&auto=format&fit=crop',
    price: 9.00,
    ingredients: ['Amaranth', 'Coconut Milk', 'Turmeric', 'Ginger', 'Toasted Coconut'],
    nutrition: { calories: 390, protein: 12, isGlutenFree: true },
    story: 'Amaranth was a staple food of the Aztecs and is prized for its high lysine content.'
  }
];
export const mockOrders: Order[] = [
  { id: 'ORD-001', customerName: 'Alice Johnson', items: [{ menuItemId: '3', quantity: 2 }], total: 29.00, status: 'Pending', createdAt: Date.now() - 1000 * 60 * 5 },
  { id: 'ORD-002', customerName: 'Bob Williams', items: [{ menuItemId: '1', quantity: 1 }, { menuItemId: '5', quantity: 1 }], total: 20.00, status: 'Pending', createdAt: Date.now() - 1000 * 60 * 10 },
  { id: 'ORD-003', customerName: 'Charlie Brown', items: [{ menuItemId: '4', quantity: 1 }], total: 13.00, status: 'In Progress', createdAt: Date.now() - 1000 * 60 * 15 },
  { id: 'ORD-004', customerName: 'Diana Prince', items: [{ menuItemId: '2', quantity: 1 }], total: 12.00, status: 'In Progress', createdAt: Date.now() - 1000 * 60 * 20 },
  { id: 'ORD-005', customerName: 'Ethan Hunt', items: [{ menuItemId: '3', quantity: 1 }, { menuItemId: '4', quantity: 1 }], total: 27.50, status: 'Out for Delivery', createdAt: Date.now() - 1000 * 60 * 30 },
  { id: 'ORD-006', customerName: 'Fiona Glenanne', items: [{ menuItemId: '6', quantity: 2 }], total: 18.00, status: 'Completed', createdAt: Date.now() - 1000 * 60 * 60 },
  { id: 'ORD-007', customerName: 'George Costanza', items: [{ menuItemId: '5', quantity: 1 }], total: 11.50, status: 'Completed', createdAt: Date.now() - 1000 * 60 * 75 },
  { id: 'ORD-008', customerName: 'Hannah Abbott', items: [{ menuItemId: '1', quantity: 1 }], total: 8.50, status: 'Pending', createdAt: Date.now() - 1000 * 60 * 2 },
];
export const mockSuppliers: Supplier[] = [
  { id: 'SUP-01', name: 'Organic Farms Co.', contactName: 'John Farmer', phone: '555-0101', email: 'john@organicfarms.com' },
  { id: 'SUP-02', name: 'Fresh Veggies Inc.', contactName: 'Jane Gardener', phone: '555-0102', email: 'jane@freshveggies.com' },
  { id: 'SUP-03', name: 'Grain Suppliers Ltd.', contactName: 'Peter Miller', phone: '555-0103', email: 'peter@grainsuppliers.com' },
];
export const mockInventoryItems: InventoryItem[] = [
  { id: 'INV-001', name: 'Foxtail Millet', stockLevel: 50, unit: 'kg', lowStockThreshold: 10, supplierId: 'SUP-03' },
  { id: 'INV-002', name: 'Quinoa', stockLevel: 45, unit: 'kg', lowStockThreshold: 10, supplierId: 'SUP-03' },
  { id: 'INV-003', name: 'Avocado', stockLevel: 100, unit: 'units', lowStockThreshold: 20, supplierId: 'SUP-02' },
  { id: 'INV-004', name: 'Chickpeas', stockLevel: 80, unit: 'kg', lowStockThreshold: 15, supplierId: 'SUP-01' },
  { id: 'INV-005', name: 'Tomatoes', stockLevel: 25, unit: 'kg', lowStockThreshold: 5, supplierId: 'SUP-02' },
  { id: 'INV-006', name: 'Almond Milk', stockLevel: 15, unit: 'liters', lowStockThreshold: 5, supplierId: 'SUP-01' },
  { id: 'INV-007', name: 'Buckwheat Flour', stockLevel: 8, unit: 'kg', lowStockThreshold: 10, supplierId: 'SUP-03' },
];
export const mockMealPlans: MealPlan[] = [
  { id: 'plan-01', name: 'Basic Lunch (3/week)', mealsPerWeek: 3, pricePerMeal: 12.50, isActive: true },
  { id: 'plan-02', name: 'Premium Lunch (5/week)', mealsPerWeek: 5, pricePerMeal: 11.50, isActive: true },
  { id: 'plan-03', name: 'Flex Lunch (10/month)', mealsPerWeek: 0, pricePerMeal: 13.00, isActive: false },
];
export const mockCorporateClients: CorporateClient[] = [
  { id: 'CC-01', companyName: 'Innovate Inc.', adminContact: { name: 'Sarah Lee', email: 'sarah@innovate.com', phone: '555-1111' }, mealPlanId: 'plan-02', employeeCount: 50, startDate: new Date('2023-01-15').getTime(), status: 'Active' },
  { id: 'CC-02', companyName: 'Tech Solutions LLC', adminContact: { name: 'Mike Chen', email: 'mike@techllc.com', phone: '555-2222' }, mealPlanId: 'plan-01', employeeCount: 25, startDate: new Date('2023-03-01').getTime(), status: 'Active' },
  { id: 'CC-03', companyName: 'Creative Minds Co.', adminContact: { name: 'Emily White', email: 'emily@creative.co', phone: '555-3333' }, mealPlanId: 'plan-02', employeeCount: 75, startDate: new Date('2022-11-10').getTime(), status: 'Active' },
];
export const mockFinancialTransactions: FinancialTransaction[] = [
  { id: 'TRN-001', date: Date.now() - 1000 * 60 * 60 * 24 * 1, description: 'Corporate Payment - Innovate Inc.', amount: 2875.00, type: 'Income', category: 'Sales', relatedClientId: 'CC-01' },
  { id: 'TRN-002', date: Date.now() - 1000 * 60 * 60 * 24 * 2, description: 'Supplier Payment - Organic Farms Co.', amount: 850.00, type: 'Expense', category: 'Supplies' },
  { id: 'TRN-003', date: Date.now() - 1000 * 60 * 60 * 24 * 3, description: 'Daily Sales - Walk-in', amount: 450.50, type: 'Income', category: 'Sales' },
  { id: 'TRN-004', date: Date.now() - 1000 * 60 * 60 * 24 * 4, description: 'Electricity Bill', amount: 250.00, type: 'Expense', category: 'Utilities' },
  { id: 'TRN-005', date: Date.now() - 1000 * 60 * 60 * 24 * 5, description: 'Corporate Payment - Tech Solutions', amount: 937.50, type: 'Income', category: 'Sales', relatedClientId: 'CC-02' },
  { id: 'TRN-006', date: Date.now() - 1000 * 60 * 60 * 24 * 6, description: 'Social Media Campaign', amount: 300.00, type: 'Expense', category: 'Marketing' },
];