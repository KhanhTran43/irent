import { api } from '../axios/axios';
import { useAuthStore } from '../store/auth';

export const useRefreshToken = () => {
  const accessToken = useAuthStore.getState().accessToken;

  const refresh = async () => {
    const response = await api.get('/refresh', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // @ts-ignore
    setAuth((prev: any) => ({ ...prev, roles: [1000], accessToken: response.data.accessToken }));

    return response.data.accessToken;
  };

  return refresh;
};
