import { produce } from 'immer';

import { Role } from '@/enums/role.enum';
import { CommentModel, CreateCommentModel } from '@/models/comment.model';
import { MyWarehouseDetailsModel } from '@/models/my-warehouse-details.model';
import { WareHouseModel } from '@/models/warehouse.model';

import { Service } from './service';

class WarehouseService extends Service<WareHouseModel, WareHouseModel, WareHouseModel> {
  constructor() {
    super();
    this.setBaseURL('warehouse');
    this.setDefaultRequestPayload(
      produce((payload) => {
        payload.includes?.push('RentedWarehouses', 'Comments', 'Comments.User', 'Images');
      }),
    );
  }

  async addComment(warehouseId: string | number, userId: string | number, comment: CreateCommentModel) {
    const response = await this.api.post<CommentModel>(`/${warehouseId}/comment/${userId}`, comment);
    return response.data;
  }

  async getMyWarehouse(userId: string | number, role: Role) {
    let response;
    if (role === Role.Owner) {
      response = await this.api.post<MyWarehouseDetailsModel[]>(`owner/${userId}`, this.defaultRequestPayload);
    } else if (role === Role.Renter) {
      response = await this.api.post<MyWarehouseDetailsModel[]>(`renter/${userId}`, this.defaultRequestPayload);
    }

    return response?.data;
  }
}

export default new WarehouseService();
