import React from 'react';
import { Link } from 'react-router-dom';
import { Wheat, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-slate text-alabaster">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Wheat className="w-8 h-8 text-harvest-gold" />
              <span className="text-2xl font-display font-bold text-alabaster">
                Grainwise
              </span>
            </Link>
            <p className="text-sm text-alabaster/70">
              Ancient Wisdom, Modern Meals: The Future of Healthy Eating.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-alabaster/70 hover:text-harvest-gold transition-colors"><Twitter /></a>
              <a href="#" className="text-alabaster/70 hover:text-harvest-gold transition-colors"><Instagram /></a>
              <a href="#" className="text-alabaster/70 hover:text-harvest-gold transition-colors"><Linkedin /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-harvest-gold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline">Our Story</Link></li>
              <li><Link to="/menu" className="hover:underline">Menu</Link></li>
              <li><Link to="/corporate" className="hover:underline">Corporate</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-harvest-gold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-harvest-gold mb-4">Newsletter</h3>
            <p className="text-sm text-alabaster/70 mb-2">Stay updated with our latest dishes and offers.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-alabaster/20 border-alabaster/30 text-alabaster placeholder:text-alabaster/50" />
              <Button type="submit" className="bg-harvest-gold text-white hover:bg-harvest-gold/90 flex-shrink-0">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-alabaster/20 text-center text-sm text-alabaster/50">
          <p>&copy; {new Date().getFullYear()} Grainwise. All Rights Reserved.</p>
          <p className="mt-1">Built with ❤️ at Cloudflare</p>
        </div>
      </div>
    </footer>
  );
};