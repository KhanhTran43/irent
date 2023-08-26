import { WardValue } from '../enums/ward-value.enum';

export type WareHouseModel = {
  id: number;
  userId: number;
  name: string;
  image: string;
  ward: WardValue;
  address: string;
  price: number;
  area: number;
  createdDate: number;
  doors: number;
  floors: number;
  rented?: boolean;
} & RentedWarehouseAttributes;

export type RentedWarehouseAttributes =
  | { rented: false }
  | {
      rented: true;
      rentedInfo: RentedWarehouseInfo;
    };

export type RentedWarehouseInfo = { rentedDate: string; endDate: string; contractBase64: string; renterId: number };

export type AddressModel = {
  address: string;
  position: AddressLocation;
};

export type AddressLocation = { lat: number; lng: number };
