import { WardValue } from '../enums/ward-value.enum';

export type RentedWarehouseInfo =
  | { rented: false }
  | {
      rented: true;
      rentedInfo: { rentedDate: string; endDate: string };
    };

export type WareHouseModel = {
  id: number;
  userId: number;
  name: string;
  ward?: WardValue;
  address?: string;
  price: number;
  area: number;
  createdDate: number;
  doorQuantity?: number;
  floors?: number;
  rented?: boolean;
} & RentedWarehouseInfo;
