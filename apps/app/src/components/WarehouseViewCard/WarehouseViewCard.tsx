import { WareHouseModel } from '../../models/warehouse.model';
import { WarehouseViewCardBase } from '../WarehouseViewCardBase';

type WarehouseViewCardProps = {
  warehouse: WareHouseModel;
  onClick: (id: number) => void;
};

export const WarehouseViewCard = (props: WarehouseViewCardProps) => {
  return <WarehouseViewCardBase {...props} showPrice></WarehouseViewCardBase>;
};
