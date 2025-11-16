import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

// Initialize from localStorage
const getStoredAuth = () => {
  if (typeof window === 'undefined') return { user: null, token: null };
  
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  return { user, token };
};

export const useAuthStore = create<AuthState>((set, get) => ({
  ...getStoredAuth(),
  setAuth: (user, token) => {
    set({ user, token });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },
  clearAuth: () => {
    set({ user: null, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  isAuthenticated: () => {
    const state = get();
    return state.user !== null && state.token !== null;
  },
  isAdmin: () => {
    const state = get();
    return state.user?.isAdmin || false;
  },
}));

