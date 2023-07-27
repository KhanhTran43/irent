import { WareHouseModel } from "./warehouse.model";

export type WarehouseDetailsModel = WareHouseModel & {
    doorQuantity: number;
    floors: number;
}