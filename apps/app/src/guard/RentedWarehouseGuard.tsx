import { useAuthStore } from '@/auth';
import { Invalid } from '@/components/Fallback';
import { GuardRouteFunc } from '@/components/Route';
import { useWarehouseResolver } from '@/resolver/WarehouseResolver';

export function RentedWarehouseGuard() {
  const { user } = useAuthStore();
  const { warehouse } = useWarehouseResolver();

  const resolve: GuardRouteFunc = () => {
    let result;

    if (warehouse.rented) {
      if (warehouse.userId === user?.id || warehouse.rentedInfo.renterId === user?.id) result = true;
      else result = false;
    } else {
      result = true;
    }

    return result === false ? { result, fallback: <Invalid /> } : { result };
  };

  return resolve;
}
