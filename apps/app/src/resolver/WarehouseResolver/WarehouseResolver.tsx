import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { Loading } from '@/components/Fallback';
import { UserModel } from '@/models/user.model';

import { useAuthStore } from '../../auth';
import { api } from '../../axios/axios';
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
      api.get<UserModel>(`user/${context.warehouse.userId}`).then((response) => setOwner(response.data));
      api.get<UserModel>(`user/${user.id}`).then((response) => setRenter(response.data));
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
    const warehouse = (await api.get<WareHouseModel>(`warehouse/${id}`)).data;

    setWarehouse(warehouse);
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
