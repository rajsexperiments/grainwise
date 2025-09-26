import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, BarChart, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
export const CorporatePage: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      <div className="bg-deep-slate text-alabaster">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold">Corporate & CSR Partnerships</h1>
            <p className="mt-4 text-lg text-alabaster/80 max-w-3xl mx-auto">
              Fuel your team's success and meet your CSR goals with healthy, sustainable, and delicious meals.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-display font-bold text-center text-deep-slate mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { step: 1, title: 'Consultation', text: 'We work with you to understand your team\'s needs, dietary preferences, and budget.' },
            { step: 2, title: 'Custom Plan', text: 'Choose from flexible meal plans, including daily lunches, weekly subscriptions, or one-off event catering.' },
            { step: 3, title: 'Seamless Delivery', text: 'We deliver fresh, individually packaged meals directly to your office, ready to enjoy.' },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-harvest-gold text-white flex items-center justify-center rounded-full text-2xl font-bold">{item.step}</div>
                  <CardTitle className="pt-4">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-deep-slate/80">{item.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-alabaster">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-4xl font-display font-bold text-center text-deep-slate mb-16">The Benefits of Partnership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: 'Increased Productivity', text: 'Nutrient-dense meals prevent afternoon slumps and keep your team focused and energized.' },
              { icon: Users, title: 'Improved Employee Health', text: 'Show your team you care by investing in their well-being, reducing sick days and boosting morale.' },
              { icon: BarChart, title: 'Tangible CSR Impact', text: 'Support sustainable agriculture and reduce your company\'s carbon footprint with our eco-friendly meals.' },
              { icon: CheckCircle, title: 'Convenience & Simplicity', text: 'We handle all the logistics, making it effortless to provide a high-value perk for your employees.' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center space-y-3"
              >
                <div className="mx-auto bg-harvest-gold/10 p-4 rounded-full w-fit">
                  <item.icon className="w-10 h-10 text-harvest-gold" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-deep-slate/80">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-display font-bold text-deep-slate">Ready to Elevate Your Workplace?</h2>
        <p className="mt-4 text-lg text-deep-slate/80">
          Let's discuss how Grainwise can create a custom wellness solution for your company.
        </p>
        <Button size="lg" asChild className="mt-8 bg-harvest-gold text-white hover:bg-harvest-gold/90 text-lg px-8 py-6 transition-transform hover:scale-105">
          <Link to="/contact">Get in Touch</Link>
        </Button>
      </div>
    </div>
  );
};