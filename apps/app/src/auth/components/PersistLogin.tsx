import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useRefreshToken } from '../hooks';

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    verifyRefreshToken();

    return () => {
      isMounted = false;
    };
  }, []);

  return <div>{isLoading ? <span>Loading ... </span> : <Outlet />}</div>;
};
