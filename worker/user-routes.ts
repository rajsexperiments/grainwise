import { Hono } from "hono";
import type { Env } from './core-utils';
import { CorporateLeadEntity, MenuItemEntity, OrderEntity, CorporateClientEntity, FinancialTransactionEntity, SupplierEntity, InventoryItemEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { CorporateLead, MenuItem, Order, CorporateClient, FinancialTransaction } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/health', (c) => c.json({ success: true, data: 'OK' }));
  // Corporate Leads
  app.post('/api/leads', async (c) => {
    const body = await c.req.json<Partial<CorporateLead>>();
    if (!isStr(body.companyName) || !isStr(body.contactName) || !isStr(body.email) || !isStr(body.message)) {
      return bad(c, 'Missing required fields');
    }
    const lead = await CorporateLeadEntity.create(c.env, {
      id: crypto.randomUUID(),
      companyName: body.companyName,
      contactName: body.contactName,
      email: body.email,
      message: body.message,
      phone: body.phone,
      submittedAt: Date.now(),
    });
    return ok(c, lead);
  });
  // Menu Items CRUD
  app.get('/api/menu-items', async (c) => {
    await MenuItemEntity.ensureSeed(c.env);
    const { items } = await MenuItemEntity.list(c.env);
    return ok(c, items);
  });
  app.post('/api/menu-items', async (c) => {
    const body = await c.req.json<Omit<MenuItem, 'id'>>();
    const newItem = await MenuItemEntity.create(c.env, { ...body, id: crypto.randomUUID() });
    return ok(c, newItem);
  });
  app.put('/api/menu-items/:id', async (c) => {
    const { id } = c.req.param();
    const body = await c.req.json<MenuItem>();
    const entity = new MenuItemEntity(c.env, id);
    if (!(await entity.exists())) return notFound(c);
    await entity.save(body);
    return ok(c, body);
  });
  app.delete('/api/menu-items/:id', async (c) => {
    const { id } = c.req.param();
    const deleted = await MenuItemEntity.delete(c.env, id);
    if (!deleted) return notFound(c);
    return ok(c, { id });
  });
  // Orders CRUD
  app.get('/api/orders', async (c) => {
    await OrderEntity.ensureSeed(c.env);
    const { items } = await OrderEntity.list(c.env);
    return ok(c, items);
  });
  app.put('/api/orders/:id', async (c) => {
    const { id } = c.req.param();
    const body = await c.req.json<Order>();
    const entity = new OrderEntity(c.env, id);
    if (!(await entity.exists())) return notFound(c);
    await entity.save(body);
    return ok(c, body);
  });
  // Inventory & Suppliers
  app.get('/api/suppliers', async (c) => {
    await SupplierEntity.ensureSeed(c.env);
    const { items } = await SupplierEntity.list(c.env);
    return ok(c, items);
  });
  app.get('/api/inventory-items', async (c) => {
    await InventoryItemEntity.ensureSeed(c.env);
    const { items } = await InventoryItemEntity.list(c.env);
    return ok(c, items);
  });
  // Corporate Clients CRUD
  app.get('/api/corporate-clients', async (c) => {
    await CorporateClientEntity.ensureSeed(c.env);
    const { items } = await CorporateClientEntity.list(c.env);
    return ok(c, items);
  });
  app.post('/api/corporate-clients', async (c) => {
    const body = await c.req.json<Omit<CorporateClient, 'id'>>();
    const newClient = { ...body, id: crypto.randomUUID() };
    await CorporateClientEntity.create(c.env, newClient);
    return ok(c, newClient);
  });
  app.put('/api/corporate-clients/:id', async (c) => {
    const { id } = c.req.param();
    const body = await c.req.json<CorporateClient>();
    const entity = new CorporateClientEntity(c.env, id);
    if (!(await entity.exists())) return notFound(c);
    await entity.save(body);
    return ok(c, body);
  });
  app.delete('/api/corporate-clients/:id', async (c) => {
    const { id } = c.req.param();
    const deleted = await CorporateClientEntity.delete(c.env, id);
    if (!deleted) return notFound(c);
    return ok(c, { id });
  });
  // Financials CRUD
  app.get('/api/financials', async (c) => {
    await FinancialTransactionEntity.ensureSeed(c.env);
    const { items } = await FinancialTransactionEntity.list(c.env);
    return ok(c, items);
  });
  app.post('/api/financials', async (c) => {
    const body = await c.req.json<Omit<FinancialTransaction, 'id'>>();
    const newTransaction = { ...body, id: crypto.randomUUID() };
    await FinancialTransactionEntity.create(c.env, newTransaction);
    return ok(c, newTransaction);
  });
}