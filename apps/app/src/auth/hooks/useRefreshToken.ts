import { api, privateApi } from '../../axios/axios';
import { AuthenticateResponse } from '../models';
import { useAuthStore } from '../store';

export const useRefreshToken = () => {
  const { user, authenticate } = useAuthStore(({ user, authenticate }) => ({ user, authenticate }));

  const refresh = async () => {
    const response = await privateApi.post<AuthenticateResponse>(`auth/refresh-token`, {});

    const { id, username, jwtToken } = response.data;

    authenticate(jwtToken, { id, username });
  };

  return refresh;
};
