import { produce } from 'immer';

import { CommentModel, CreateCommentModel } from '@/models/comment.model';
import { WareHouseModel } from '@/models/warehouse.model';

import { Service } from './service';

class WarehouseService extends Service<WareHouseModel, WareHouseModel, WareHouseModel> {
  constructor() {
    super();
    this.setBaseURL('warehouse');
    this.setDefaultRequestPayload(
      produce((payload) => {
        payload.includes?.push('RentedWarehouses', 'Comments', 'Comments.User');
      }),
    );
  }

  async addComment(warehouseId: string | number, userId: string | number, comment: CreateCommentModel) {
    const response = await this.api.post<CommentModel>(`/${warehouseId}/comment/${userId}`, comment);
    return response.data;
  }
}

export default new WarehouseService();
