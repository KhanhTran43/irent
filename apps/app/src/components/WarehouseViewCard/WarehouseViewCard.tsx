import { WareHouseModel } from '../../models/warehouse.model';
import { WarehouseViewCardBase } from '../WarehouseViewCardBase';

type WarehouseViewCardProps = {
  warehouse: WareHouseModel;
  onClick: (id: number) => void;
};

const WarehouseViewCard = (props: WarehouseViewCardProps) => {
  return <WarehouseViewCardBase {...props} showPrice></WarehouseViewCardBase>;
};

export default WarehouseViewCard;
