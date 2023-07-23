import { WardValue } from "../enums/ward-value.enum";

export interface WareHouseModel {
    id: number;
    name: string;
    ward: WardValue;
    price: number;
    area: number;
    createdDate: number;
}
