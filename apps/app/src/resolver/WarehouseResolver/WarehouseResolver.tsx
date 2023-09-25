import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { Loading } from '@/components/Fallback';
import { UserModel } from '@/models/user.model';
import userService from '@/service/user-service';
import warehouseService from '@/service/warehouse-service';

import { useAuthStore } from '../../auth';
import { WareHouseModel } from '../../models/warehouse.model';

type WarehouseResolverType = {
  id: string;
  warehouse: WareHouseModel;
  isOwner: boolean;
};

const WarehouseResolverContext = createContext<WarehouseResolverType | undefined>(undefined);

export function useWarehouseResolver() {
  const context = useContext(WarehouseResolverContext);

  if (context === undefined) throw Error(`WarehouseResolver: The component is not inside the resolver`);

  return context;
}

export function useRentingWarehouseResolver() {
  const context = useContext(WarehouseResolverContext);
  const { user } = useAuthStore();
  const [renter, setRenter] = useState<UserModel>();
  const [owner, setOwner] = useState<UserModel>();

  useEffect(() => {
    if (!!context && !!user) {
      userService.get(context.warehouse.userId).then((data) => setOwner(data));
      userService.get(user.id).then((data) => setRenter(data));
    }
  }, [context?.id]);

  if (context === undefined) throw Error(`WarehouseResolver: The component is not inside the resolver`);

  return { ...context, owner, renter };
}

export function WarehouseResolver() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [warehouse, setWarehouse] = useState<WareHouseModel>();
  const isOwner = warehouse?.userId === user?.id;

  useEffect(() => {
    getWarehouse();
  }, [id]);

  const getWarehouse = async () => {
    if (id !== undefined) {
      const warehouse = await warehouseService.get(id);
      setWarehouse(warehouse);
    }
  };

  return (
    <>
      {warehouse !== undefined && id !== undefined ? (
        <WarehouseResolverContext.Provider value={{ warehouse, id, isOwner: isOwner }}>
          <Outlet />
        </WarehouseResolverContext.Provider>
      ) : (
        <Loading />
      )}
    </>
  );
}
