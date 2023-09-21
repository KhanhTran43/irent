import { MyWarehouseDetailsModel } from '../../models/my-warehouse-details.model';
import { WarehouseViewCardBase, WarehouseViewCardProps } from '../WarehouseViewCardBase';

type MyWarehouseViewCardProps = {
  warehouse: MyWarehouseDetailsModel;
  type?: 'history' | 'own';
  onClick: (id: number) => void;
};

export const MyWarehouseViewCard = ({ type = 'history', ...props }: MyWarehouseViewCardProps) => {
  const getViewCardOptions = (): Partial<WarehouseViewCardProps> => {
    if (type === 'history') {
      return { showRentedProgression: true, showStatus: true };
    } else return {};
  };

  return <WarehouseViewCardBase {...props} {...getViewCardOptions()}></WarehouseViewCardBase>;
};
