import { RentedWarehouseInfo, RentedWarehouseStatus } from '@/models/rented-warehouse.model';

import { DateProgress } from '../Common/DateProgress';

export type RentedWarehouseProgressProps = {
  rentedInfo?: RentedWarehouseInfo;
};

export function RentedWarehouseProgress({ rentedInfo }: RentedWarehouseProgressProps) {
  const renderProgress = () => {
    if (rentedInfo) {
      const { startDate, endDate, rentedDate, status } = rentedInfo;

      if (status === RentedWarehouseStatus.Waiting)
        return (
          <DateProgress
            daysLeftTemplate={'Còn {0} để thanh toán hợp đồng'}
            endDate={startDate}
            startDate={rentedDate}
          ></DateProgress>
        );
      else if (status === RentedWarehouseStatus.Renting)
        return (
          <DateProgress
            daysLeftTemplate={'Còn {0} trước khi hết hạn hợp đồng'}
            endDate={endDate}
            startDate={startDate}
          ></DateProgress>
        );
    } else return null;
  };

  return <>{renderProgress()}</>;
}
