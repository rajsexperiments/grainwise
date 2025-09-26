import { IndexedEntity } from "./core-utils";
import type { User, MenuItem, CorporateLead, Order, Supplier, InventoryItem, CorporateClient, FinancialTransaction } from "@shared/types";
import { menuItems as mockMenuItems, mockOrders, mockSuppliers, mockInventoryItems, mockCorporateClients, mockFinancialTransactions } from "../src/lib/mock-data";
// USER ENTITY: For internal platform users
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "", email: "", role: "Kitchen Manager" };
}
// MENU ITEM ENTITY
export class MenuItemEntity extends IndexedEntity<MenuItem> {
  static readonly entityName = "menuItem";
  static readonly indexName = "menuItems";
  static readonly initialState: MenuItem = {
    id: "", name: "", description: "", category: "Lunch", subCategory: "Power Bowl", imageUrl: "",
    price: 0, ingredients: [], nutrition: { calories: 0, protein: 0, isGlutenFree: false }, story: "",
  };
  static readonly seedData = mockMenuItems;
}
// CORPORATE LEAD ENTITY
export class CorporateLeadEntity extends IndexedEntity<CorporateLead> {
  static readonly entityName = "corporateLead";
  static readonly indexName = "corporateLeads";
  static readonly initialState: CorporateLead = {
    id: "", companyName: "", contactName: "", email: "", message: "", submittedAt: 0,
  };
}
// ORDER ENTITY
export class OrderEntity extends IndexedEntity<Order> {
  static readonly entityName = "order";
  static readonly indexName = "orders";
  static readonly initialState: Order = {
    id: "", customerName: "", items: [], total: 0, status: "Pending", createdAt: 0,
  };
  static readonly seedData = mockOrders;
}
// SUPPLIER ENTITY
export class SupplierEntity extends IndexedEntity<Supplier> {
  static readonly entityName = "supplier";
  static readonly indexName = "suppliers";
  static readonly initialState: Supplier = {
    id: "", name: "", contactName: "", phone: "", email: "",
  };
  static readonly seedData = mockSuppliers;
}
// INVENTORY ITEM ENTITY
export class InventoryItemEntity extends IndexedEntity<InventoryItem> {
  static readonly entityName = "inventoryItem";
  static readonly indexName = "inventoryItems";
  static readonly initialState: InventoryItem = {
    id: "", name: "", stockLevel: 0, unit: "units", lowStockThreshold: 0, supplierId: "",
  };
  static readonly seedData = mockInventoryItems;
}
// CORPORATE CLIENT ENTITY
export class CorporateClientEntity extends IndexedEntity<CorporateClient> {
  static readonly entityName = "corporateClient";
  static readonly indexName = "corporateClients";
  static readonly initialState: CorporateClient = {
    id: "", companyName: "", adminContact: { name: "", email: "", phone: "" },
    mealPlanId: "", employeeCount: 0, startDate: 0, status: 'Active',
  };
  static readonly seedData = mockCorporateClients;
}
// FINANCIAL TRANSACTION ENTITY
export class FinancialTransactionEntity extends IndexedEntity<FinancialTransaction> {
  static readonly entityName = "financialTransaction";
  static readonly indexName = "financialTransactions";
  static readonly initialState: FinancialTransaction = {
    id: "", date: 0, description: "", amount: 0, type: "Income", category: "Sales",
  };
  static readonly seedData = mockFinancialTransactions;
}