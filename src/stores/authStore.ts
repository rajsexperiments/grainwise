import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@shared/types';
interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
// Mock user for demonstration purposes
const mockUser: User = {
  id: 'admin-01',
  name: 'Admin User',
  email: 'admin@grainwise.com',
  role: 'Administrator',
};
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'grainwise-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
// Function to simulate a login API call
export const mockLogin = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@grainwise.com' && password === 'password') {
        resolve(mockUser);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};