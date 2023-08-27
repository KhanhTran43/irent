import { create } from 'zustand';

import { Role } from '@/enums/role.enum';

import { AuthUser } from '../models/auth';

type AuthOptionsUser = Omit<AuthUser, 'role'> & {
  role: string;
};

type AuthenticateOptions = {
  token: string;
  user: AuthOptionsUser;
};

export type AuthStoreType = {
  accessToken?: string;
  setAccessToken: (token: string) => void;
  user?: AuthUser;
  isAuthenticated?: boolean;
  setUser: (user: AuthUser) => void;
  authenticate: (options?: AuthenticateOptions) => void;
  logout: () => void;
};

// TODO: Make it do not persist, use useRefreshToken for initiate value
export const useAuthStore = create<AuthStoreType>((set) => ({
  setAccessToken: (token: string) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
  authenticate: (options) => {
    if (options) {
      const { token, user } = options;
      set({
        accessToken: token,
        user: { id: user.id, name: user.name, role: Role[user.role as keyof typeof Role] },
        isAuthenticated: true,
      });
    } else set({ isAuthenticated: false });
  },
  logout: () => set({ accessToken: undefined, user: undefined, isAuthenticated: false }),
}));
