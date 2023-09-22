export type RentedWarehouseModel = {
  id: number;
  renterId: number;
  warehouseId: number;
  rentedDate: string;
  startDate: string;
  endDate: string;
  confirmDate: string;
  contractBase64: string;
  deposit: number;
  confirm: number;
  total: number;
  status: RentedWarehouseStatus;
};

export type RentedWarehouseInfo = {
  id: number;
  renterId: number;
  rentedDate: string;
  startDate: string;
  endDate: string;
  confirmDate: string;
  contractBase64: string;
  deposit: number;
  confirm: number;
  total: number;
  status: RentedWarehouseStatus;
};

export type CreateRentedWarehouseModel = Omit<RentedWarehouseModel, 'status' | 'confirmDate'>;

export enum RentedWarehouseStatus {
  None,
  Waiting,
  Renting,
  Canceling,
  Canceled,
  Expired,
  Ended,
  Confirmed,
}
