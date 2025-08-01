
import { create } from 'zustand';

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

  setUser: (user) => set({ user }),
  setContacts: (contacts) => set({ contacts }),

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, contacts: [] });
  },
}));