import { WareHouseModel } from "./warehouse.model";

export interface WarehouseDetailsModel extends WareHouseModel {
    doorQuantity: number;
    floors: number;
}