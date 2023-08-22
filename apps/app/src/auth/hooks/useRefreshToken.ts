import { api, privateApi } from '../../axios/axios';
import { AuthenticateResponse } from '../models';
import { useAuthStore } from '../store';

export const useRefreshToken = () => {
  const { user, authenticate } = useAuthStore(({ user, authenticate }) => ({ user, authenticate }));

  const refresh = async () => {
    try {
      const response = await privateApi.post<AuthenticateResponse>(`auth/refresh-token`, {});

      const { id, name, jwtToken } = response.data;

      authenticate({ token: jwtToken, user: { id, name } });
    } catch (error) {
      authenticate();
    }
  };

  return refresh;
};

// access token

// refresh token
