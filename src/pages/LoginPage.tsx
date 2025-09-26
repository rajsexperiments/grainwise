import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wheat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore, mockLogin } from '@/stores/authStore';
import { toast } from 'sonner';
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});
type LoginFormValues = z.infer<typeof loginSchema>;
export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@grainwise.com',
      password: 'password',
    },
  });
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const user = await mockLogin(data.email, data.password);
      login(user);
      toast.success('Login successful!');
      navigate('/operations/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error('Login Failed', { description: errorMessage });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-alabaster p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md mx-auto shadow-2xl border-2 border-deep-slate/10">
          <CardHeader className="text-center">
            <Link to="/" className="flex items-center justify-center gap-2 group mb-4">
              <Wheat className="w-10 h-10 text-harvest-gold transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-3xl font-display font-bold text-deep-slate">
                Grainwise
              </span>
            </Link>
            <CardTitle className="text-2xl font-bold">Operations Platform</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="manager@grainwise.com" {...form.register('email')} />
                {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...form.register('password')} />
                {form.formState.errors.password && <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-harvest-gold text-white hover:bg-harvest-gold/90" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};