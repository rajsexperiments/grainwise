import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { Mail, Phone, MapPin } from 'lucide-react';
const contactFormSchema = z.object({
  companyName: z.string().min(1, { message: 'Company name is required' }),
  contactName: z.string().min(1, { message: 'Your name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});
type ContactFormValues = z.infer<typeof contactFormSchema>;
export const ContactPage: React.FC = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      message: '',
    },
  });
  const onSubmit = async (data: ContactFormValues) => {
    const toastId = toast.loading('Sending your message...');
    try {
      await api('/api/leads', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      toast.success('Message sent!', {
        id: toastId,
        description: 'Thank you for reaching out. We will get back to you shortly.',
      });
      form.reset();
    } catch (error) {
      toast.error('Failed to send message', {
        id: toastId,
        description: 'Please try again later.',
      });
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold text-deep-slate">Contact Us</h1>
        <p className="mt-4 text-lg text-deep-slate/80 max-w-2xl mx-auto">
          We'd love to hear from you. Whether it's a question about our menu or a corporate partnership inquiry, we're here to help.
        </p>
      </motion.div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-harvest-gold mt-1" />
            <div>
              <h3 className="text-xl font-bold">Email</h3>
              <p className="text-deep-slate/80">General Inquiries: hello@grainwise.com</p>
              <p className="text-deep-slate/80">Partnerships: corporate@grainwise.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-harvest-gold mt-1" />
            <div>
              <h3 className="text-xl font-bold">Phone</h3>
              <p className="text-deep-slate/80">(555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-harvest-gold mt-1" />
            <div>
              <h3 className="text-xl font-bold">Address</h3>
              <p className="text-deep-slate/80">123 Millet Lane, Healthville, CA 90210</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jane.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us how we can help..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-harvest-gold text-white hover:bg-harvest-gold/90" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};