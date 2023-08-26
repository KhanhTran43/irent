import { isEmpty } from 'lodash';

import { useAuthStore } from '@/auth';
import { Unauthorized } from '@/components/Fallback';
import { GuardRouteFunc } from '@/components/Route';
import { Role } from '@/enums/role.enum';

type AuthGuardOptions = {
  requireRoles?: Role[];
};

export function AuthGuard(options?: AuthGuardOptions) {
  const { isAuthenticated, user } = useAuthStore();

  const resolve: GuardRouteFunc = () => {
    let result;

    if (isAuthenticated) {
      if (options?.requireRoles === undefined || isEmpty(options.requireRoles)) result = true;
      else {
        result = user?.role ? options.requireRoles.includes(user.role) : false;
      }
    } else {
      result = '/login';
    }

    return result === false ? { result, fallback: <Unauthorized /> } : { result };
  };

  return resolve;
}
