import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { menuItems } from '@/lib/mock-data';
import { MenuItem } from '@shared/types';
import { Leaf, Beef } from 'lucide-react';
type Category = 'All' | 'Breakfast' | 'Brunch' | 'Lunch';
export const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return menuItems;
    return menuItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);
  const categories: Category[] = ['All', 'Breakfast', 'Brunch', 'Lunch'];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold text-deep-slate">Our Menu</h1>
        <p className="mt-4 text-lg text-deep-slate/80 max-w-2xl mx-auto">
          Explore our delicious and wholesome millet-based creations, crafted with love and the finest ingredients.
        </p>
      </motion.div>
      <div className="flex justify-center my-12">
        <div className="flex flex-wrap gap-2 bg-deep-slate/5 p-2 rounded-full">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'ghost'}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 py-2 transition-all duration-200 ${activeCategory === category ? 'bg-harvest-gold text-white' : 'text-deep-slate hover:bg-harvest-gold/10'}`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item: MenuItem, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden group h-full flex flex-col shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="overflow-hidden relative">
                <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                <Badge className="absolute top-4 right-4 bg-harvest-gold text-white">${item.price.toFixed(2)}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-sm text-deep-slate/70 italic mb-4">"{item.story}"</p>
                  <div className="flex items-center justify-between text-sm text-deep-slate/80">
                    <span className="font-semibold">{item.nutrition.calories} kcal</span>
                    <div className="flex items-center gap-4">
                      {item.nutrition.isGlutenFree && <span className="flex items-center gap-1"><Leaf className="w-4 h-4 text-green-600" /> GF</span>}
                      <span className="flex items-center gap-1"><Beef className="w-4 h-4 text-blue-600" /> {item.nutrition.protein}g</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};