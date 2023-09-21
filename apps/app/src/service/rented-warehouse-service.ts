import { produce } from 'immer';

import { MyWarehouseDetailsModel } from '@/models/my-warehouse-details.model';
import { WareHouseModel } from '@/models/warehouse.model';

import { Service } from './service';

class RentedWarehouseService extends Service<WareHouseModel, WareHouseModel, WareHouseModel> {
  constructor() {
    super();
    this.setBaseURL('rentedWarehouse');
    this.setDefaultRequestPayload(
      produce((payload) => {
        payload.includes?.push('Warehouse', 'Warehouse.Images');
      }),
    );
  }

  async getRenterWarehouses(userId: string | number) {
    const response = await this.api.post<MyWarehouseDetailsModel[]>(`renter/${userId}`, this.defaultRequestPayload);

    return response.data;
  }
}

export default new RentedWarehouseService();
