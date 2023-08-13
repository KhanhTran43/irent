import { api } from '../../axios/axios';
import { AuthenticateResponse } from '../models';
import { useAuthStore } from '../store';

export const useRefreshToken = () => {
  const { authenticate } = useAuthStore(({ authenticate }) => ({
    authenticate,
  }));

  const refresh = async () => {
    const response = await api.get<AuthenticateResponse>('auth/refresh', {});

    const { id, username, jwtToken } = response.data;

    authenticate(jwtToken, { id, username });
  };

  return refresh;
};
