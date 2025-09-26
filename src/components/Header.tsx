import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Wheat, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'Our Story' },
  { to: '/corporate', label: 'Corporate' },
  { to: '/contact', label: 'Contact' },
];
export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const NavLinksContent = () => (
    <>
      {navLinks.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setIsMenuOpen(false)}
          className={({ isActive }) =>
            cn(
              'text-lg font-medium transition-colors duration-200',
              'hover:text-harvest-gold',
              isActive ? 'text-harvest-gold' : 'text-deep-slate'
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </>
  );
  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-alabaster/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <Wheat className="w-8 h-8 text-harvest-gold transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-2xl font-display font-bold text-deep-slate">
              Grainwise
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinksContent />
          </nav>
          <div className="hidden md:block">
            <Button asChild className="bg-harvest-gold text-white hover:bg-harvest-gold/90 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm hover:shadow-md">
                <Link to="/login">
                    Operator Login
                </Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-alabaster/95 backdrop-blur-md absolute top-20 left-0 right-0 shadow-lg animate-fade-in">
          <nav className="flex flex-col items-center space-y-6 py-8">
            <NavLinksContent />
            <Button asChild className="bg-harvest-gold text-white hover:bg-harvest-gold/90">
                <Link to="/login">
                    Operator Login
                </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};