import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthStoreType = {
  accessToken: string;
  setAccessToken: (token: string) => void;
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      accessToken: '',
      setAccessToken: (token: string) => set({ accessToken: token }),
    }),
    {
      name: 'auth',
    },
  ),
);
