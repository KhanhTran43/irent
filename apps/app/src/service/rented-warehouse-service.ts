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

  async confirmWarehouse(rentedWarehouseId: string | number) {
    await this.api.patch(`confirm/${rentedWarehouseId}`);
  }

  async requestCancelWarehouse(rentedWarehouseId: string | number) {
    await this.api.patch(`cancel_request/${rentedWarehouseId}`, {}, { withCredentials: true });
  }

  async confirmCancelWarehouse(rentedWarehouseId: string | number) {
    await this.api.patch(`cancel_confirm/${rentedWarehouseId}`, {}, { withCredentials: true });
  }
}

export default new RentedWarehouseService();
