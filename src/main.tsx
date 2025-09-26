import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { PublicLayout } from '@/components/PublicLayout';
import { MenuPage } from '@/pages/MenuPage';
import { AboutPage } from '@/pages/AboutPage';
import { CorporatePage } from '@/pages/CorporatePage';
import { ContactPage } from '@/pages/ContactPage';
import { LoginPage } from '@/pages/LoginPage';
import { OperationsLayout } from '@/components/OperationsLayout';
import { DashboardPage } from '@/pages/operations/DashboardPage';
import { OrdersPage } from '@/pages/operations/OrdersPage';
import { MenuManagementPage } from '@/pages/operations/MenuManagementPage';
import { InventoryPage } from '@/pages/operations/InventoryPage';
import { CorporateClientsPage } from '@/pages/operations/CorporateClientsPage';
import { FinancialsPage } from '@/pages/operations/FinancialsPage';
const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/menu", element: <MenuPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/corporate", element: <CorporatePage /> },
      { path: "/contact", element: <ContactPage /> },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/operations",
    element: <OperationsLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "menu", element: <MenuManagementPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "corporate", element: <CorporateClientsPage /> },
      { path: "financials", element: <FinancialsPage /> },
    ]
  }
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)