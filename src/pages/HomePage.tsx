import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Leaf, UtensilsCrossed, Building, HeartHandshake, Star } from 'lucide-react';
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
export const HomePage: React.FC = () => {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1540420773420-2850a42b235d?q=80&w=2070&auto=format&fit=crop"
          alt="Delicious millet dish"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div
          className="relative z-20 max-w-4xl mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            Ancient Wisdom, Modern Meals
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-alabaster/90 max-w-2xl mx-auto">
            The Future of Healthy Eating. Nutritious, convenient, and delicious millet-based foods to improve your health and wellness.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" asChild className="bg-harvest-gold text-white hover:bg-harvest-gold/90 text-lg px-8 py-6 transition-transform hover:scale-105">
              <Link to="/menu">Explore Our Menu</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white hover:text-deep-slate text-lg px-8 py-6 transition-transform hover:scale-105">
              <Link to="/corporate">Corporate Plans</Link>
            </Button>
          </div>
        </motion.div>
      </section>
      {/* Our Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-deep-slate">Our Mission</h2>
          <p className="mt-4 text-lg text-deep-slate/80 max-w-3xl mx-auto">
            We are dedicated to reviving ancient food traditions by offering nutritious, convenient, and delicious millet-based meals that promote a healthier lifestyle and a more sustainable planet.
          </p>
        </motion.div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Leaf, title: 'What', text: 'Delicious, chef-crafted meals using a variety of ancient millets, packed with nutrients and flavor.' },
            { icon: HeartHandshake, title: 'Why', text: 'To improve personal health and wellness, support sustainable farming, and celebrate culinary heritage.' },
            { icon: UtensilsCrossed, title: 'How', text: 'By sourcing high-quality, organic millets and creating convenient meal options for modern, busy lifestyles.' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ ...fadeIn, visible: { ...fadeIn.visible, transition: { ...fadeIn.visible.transition, delay: index * 0.2 } } }}
            >
              <Card className="text-center h-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-harvest-gold">
                <CardHeader>
                  <div className="mx-auto bg-harvest-gold/10 p-4 rounded-full w-fit">
                    <item.icon className="w-10 h-10 text-harvest-gold" />
                  </div>
                  <CardTitle className="text-2xl font-bold pt-4">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-deep-slate/80">{item.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Our Offerings Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-deep-slate">Our Offerings</h2>
          <p className="mt-4 text-lg text-deep-slate/80 max-w-3xl mx-auto">
            Perfectly balanced meals for every part of your day.
          </p>
        </motion.div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Breakfast', desc: 'Start your day with energy-boosting porridges and savory pancakes.', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop' },
            { title: 'Brunch', desc: 'Leisurely and wholesome options perfect for a late morning treat.', img: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=800&auto=format&fit=crop' },
            { title: 'Lunch', desc: 'Nourishing power bowls and salads to fuel your afternoon.', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop' },
          ].map((offering, index) => (
            <motion.div
              key={offering.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ ...fadeIn, visible: { ...fadeIn.visible, transition: { ...fadeIn.visible.transition, delay: index * 0.2 } } }}
            >
              <Card className="overflow-hidden group h-full flex flex-col shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="overflow-hidden">
                  <img src={offering.img} alt={offering.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{offering.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-deep-slate/80 flex-grow">{offering.desc}</p>
                  <Button asChild variant="link" className="text-harvest-gold p-0 mt-4 self-start h-auto">
                    <Link to="/menu">Explore Menu &rarr;</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Corporate Wellness Section */}
      <section className="bg-deep-slate text-alabaster py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <Building className="w-16 h-16 text-harvest-gold mb-4" />
            <h2 className="text-4xl md:text-5xl font-display font-bold">Elevate Your Workplace Wellness</h2>
            <p className="mt-6 text-lg text-alabaster/80">
              Invest in your team's health and productivity with our corporate wellness partnerships. Providing nutritious, millet-based meals is a powerful way to boost employee well-being and demonstrate your commitment to a healthy company culture.
            </p>
            <Button size="lg" asChild className="mt-8 bg-harvest-gold text-white hover:bg-harvest-gold/90 text-lg px-8 py-6 transition-transform hover:scale-105">
              <Link to="/corporate">Partner With Us</Link>
            </Button>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ ...fadeIn, visible: { ...fadeIn.visible, transition: { ...fadeIn.visible.transition, delay: 0.2 } } }}
          >
            <img src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?q=80&w=800&auto=format&fit=crop" alt="Corporate team" className="rounded-lg shadow-2xl" />
          </motion.div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-deep-slate">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-deep-slate/80 max-w-3xl mx-auto">
            We're just getting started, but here's what we aim to hear.
          </p>
        </motion.div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: 'Sarah L.', role: 'Happy Customer', text: '"The Mediterranean Quinoa Bowl is my absolute favorite! It\'s so fresh and filling. I feel energized all afternoon."' },
            { name: 'John D.', role: 'Wellness Manager, TechCorp', text: '"Grainwise has transformed our office lunches. Our team loves the variety and feels great. It\'s a fantastic wellness initiative."' },
          ].map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ ...fadeIn, visible: { ...fadeIn.visible, transition: { ...fadeIn.visible.transition, delay: index * 0.2 } } }}
            >
              <Card className="h-full bg-harvest-gold/5 border-2 border-harvest-gold/20 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-lg italic text-deep-slate/90">"{testimonial.text}"</p>
                  <p className="mt-4 font-bold text-deep-slate">{testimonial.name}</p>
                  <p className="text-sm text-deep-slate/70">{testimonial.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};