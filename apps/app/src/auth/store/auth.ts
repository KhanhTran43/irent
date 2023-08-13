import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AuthUser } from '../models/auth';

export type AuthStoreType = {
  accessToken: string;
  setAccessToken: (token: string) => void;
  user?: AuthUser;
  setUser: (user: AuthUser) => void;
  authenticate: (token: string, user: AuthUser) => void;
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      accessToken: '',
      setAccessToken: (token: string) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      authenticate: (token, user) => set({ accessToken: token, user }),
    }),
    {
      name: 'auth',
    },
  ),
);
