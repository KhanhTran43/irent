export type RentedWarehouseModel = {
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
}
