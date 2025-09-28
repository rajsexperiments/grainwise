import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Recycle, ShieldCheck } from 'lucide-react';
export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold text-deep-slate">Our Story</h1>
        <p className="mt-4 text-lg text-deep-slate/80 max-w-3xl mx-auto">
          Rediscovering ancient grains to nourish modern lives.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src="./src/components/ui/we.png" alt="Field of millet" className="rounded-lg shadow-2xl w-full h-auto object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold font-display text-deep-slate">The Grainwise Beginning</h2>
          <p className="text-deep-slate/80 leading-relaxed">
            Grainwise was born from a simple yet powerful idea: what if the solution to many of our modern health and environmental challenges lies in the wisdom of our ancestors? We embarked on a journey to explore the world of ancient grains, particularly millets, which have nourished civilizations for thousands of years but have been largely forgotten in the modern diet.
          </p>
          <p className="text-deep-slate/80 leading-relaxed">
            We discovered a treasure trove of nutrition, flavor, and resilience. These "super grains" are not only packed with protein, fiber, and micronutrients but are also naturally gluten-free and have a low glycemic index. More than that, they are incredibly sustainable, requiring less water and fewer inputs than mainstream crops like wheat and rice.
          </p>
        </motion.div>
      </div>
      <div className="text-center space-y-12">
        <h2 className="text-4xl font-display font-bold text-deep-slate">Our Commitment</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Sprout, title: 'Sustainable Sourcing', text: 'We partner with local and organic farms that practice regenerative agriculture, ensuring our millets are grown in a way that heals the earth.' },
            { icon: Recycle, title: 'Eco-Friendly Practices', text: 'From our compostable packaging to our low-waste kitchen operations, sustainability is at the core of everything we do.' },
            { icon: ShieldCheck, title: 'Uncompromising Quality', text: 'Every ingredient is carefully selected for its quality, nutritional value, and flavor. We never use artificial preservatives, colors, or flavors.' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="space-y-3"
            >
              <div className="mx-auto bg-harvest-gold/10 p-4 rounded-full w-fit">
                <item.icon className="w-10 h-10 text-harvest-gold" />
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-deep-slate/80">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};