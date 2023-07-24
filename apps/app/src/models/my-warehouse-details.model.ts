import { WareHouseModel } from "./warehouse.model";

export interface MyWarehouseDetailsModel extends WareHouseModel {
    endDate: number;
    daysLeft: number;
}
