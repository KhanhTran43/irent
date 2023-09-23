import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { AuthUser } from '@/auth/models/auth';
import { Role } from '@/enums/role.enum';
import { WareHouseModel } from '@/models/warehouse.model';
import rentedWarehouseService from '@/service/rented-warehouse-service';
import warehouseService from '@/service/warehouse-service';
import { OmitFunctions } from '@/utils/type';

type MyWarehouseStore = {
  warehouses: WareHouseModel[];
  loading: boolean;
  fetchMyWarehouses: (user: AuthUser | undefined) => Promise<void>;
  reset: () => void;
};

const initialState: OmitFunctions<MyWarehouseStore> = {
  warehouses: [],
  loading: true,
};

export const useMyWarehouseStore = create<MyWarehouseStore, [['zustand/immer', MyWarehouseStore]]>(
  immer<MyWarehouseStore>((set) => ({
    // State
    ...initialState,

    // Actions
    fetchMyWarehouses: async (user) => {
      set({ loading: true });
      if (user) {
        switch (user.role) {
          case Role.Owner:
            warehouseService.getOwnerWarehouse(user.id).then((data) => {
              if (data && data.length !== 0) set({ warehouses: data });
              set({ loading: false });
            });
            break;
          case Role.Renter:
            rentedWarehouseService.getRenterWarehouses(user.id).then((data) => {
              if (data && data.length !== 0) set({ warehouses: data });
              set({ loading: false });
            });
            break;
          default:
            break;
        }
      } else set({ loading: false });
    },
    // Reset the state to the initial values
    reset: () => set(initialState),
  })),
);
