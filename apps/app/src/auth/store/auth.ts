import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AuthUser } from '../models/auth';

export type AuthStoreType = {
  accessToken: string;
  setAccessToken: (token: string) => void;
  user?: AuthUser;
  isAuthenticated: boolean;
  setUser: (user: AuthUser) => void;
  authenticate: (token: string, user: AuthUser) => void;
};

// TODO: Make it do not persist, use useRefreshToken for initiate value
export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      accessToken: '',
      isAuthenticated: false,
      setAccessToken: (token: string) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      authenticate: (token, user) => set({ accessToken: token, user, isAuthenticated: true }),
    }),
    {
      name: 'auth',
    },
  ),
);
