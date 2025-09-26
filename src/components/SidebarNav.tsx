import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Package, Wheat, Utensils, Warehouse, Building, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
const navItems = [
  { to: '/operations/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/operations/orders', icon: Package, label: 'Orders' },
  { to: '/operations/menu', icon: Utensils, label: 'Menu Management' },
  { to: '/operations/inventory', icon: Warehouse, label: 'Inventory' },
  { to: '/operations/corporate', icon: Building, label: 'Corporate Clients' },
  { to: '/operations/financials', icon: DollarSign, label: 'Financials' },
];
interface NavLinksProps {
  onLinkClick?: () => void;
}
export const NavLinks: React.FC<NavLinksProps> = ({ onLinkClick }) => (
  <ul className="grid items-start px-4 text-sm font-medium">
    {navItems.map((item) => (
      <li key={item.to}>
        <NavLink
          to={item.to}
          onClick={onLinkClick}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary',
              isActive && 'bg-muted text-primary font-semibold'
            )
          }
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </NavLink>
      </li>
    ))}
  </ul>
);
export const SidebarNav: React.FC = () => {
  return (
    <aside className="hidden border-r bg-background sm:flex flex-col w-64">
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/operations/dashboard" className="flex items-center gap-2 font-semibold">
          <Wheat className="h-6 w-6 text-harvest-gold" />
          <span className="font-display text-xl">Grainwise Ops</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <NavLinks />
      </nav>
    </aside>
  );
};