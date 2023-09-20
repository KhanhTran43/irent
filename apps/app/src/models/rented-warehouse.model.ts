export type RentedWarehouseModel = {
  renterId: number;
  warehouseId: number;
  rentedDate: string;
  confirmDate: string;
  startDate: string;
  endDate: string;
  contractBase64: string;
  status: RentedWarehouseStatus;
};

export type CreateRentedWarehouseModel = Omit<RentedWarehouseModel, 'status' | 'confirmDate'>;

export enum RentedWarehouseStatus {
  None,
  Waiting,
  Rented,
  Canceling,
  Canceled,
  Expired,
}
