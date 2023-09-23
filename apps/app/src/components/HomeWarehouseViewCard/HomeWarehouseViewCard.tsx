import { WareHouseModel } from '../../models/warehouse.model';
import { WarehouseViewCardBase } from '../WarehouseViewCardBase';

type HomeWarehouseViewCardProps = {
  warehouse: WareHouseModel;
  onClick?: (id: number) => void;
};

export const HomeWarehouseViewCard = (props: HomeWarehouseViewCardProps) => {
  return <WarehouseViewCardBase {...props} showPrice></WarehouseViewCardBase>;
};
