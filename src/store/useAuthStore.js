// store/useAuthStore.js
import { create } from 'zustand';
import { toast } from 'react-toastify';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  contacts: [],

  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },

  setUser: (user) => {
    set({ user });
    // Show success toast on login/register
    if (user) {
      toast.success(`Welcome back, ${user.username}! 🎉`, {
        autoClose: 3000,
        theme: 'colored',
      });
    }
  },

  setContacts: (contacts) => set({ contacts }),

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, contacts: [] });

    // Show logout toast
    toast.info('You’ve been logged out.', {
      autoClose: 2000,
      theme: 'colored',
    });
  },

  // Optional: Add a helper for registration success
  registerSuccess: (user) => {
    set({ user });
    toast.success(`Account created! Welcome, ${user.username}! 🚀`, {
      autoClose: 4000,
      theme: 'colored',
    });
  },

  // Optional: Add login success (if different from setUser)
  loginSuccess: (user) => {
    set({ user });
    toast.success(`Logged in as ${user.username}! 👋`, {
      autoClose: 3000,
      theme: 'colored',
    });
  },
}));