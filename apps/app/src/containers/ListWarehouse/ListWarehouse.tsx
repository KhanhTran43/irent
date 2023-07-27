import styled from 'styled-components';

import MyWarehouseViewCard from '../../components/MyWarehouseViewCard/MyWarehouseViewCard';
import { WardValue } from '../../enums/ward-value.enum';
import { MyWarehouseDetailsModel } from '../../models/my-warehouse-details.model';

const myWarehouseDetailsMock: MyWarehouseDetailsModel[] = [
  {
    id: 1,
    name: 'Kl',
    ward: WardValue.CAM_LE,
    price: 100,
    area: 100,
    createdDate: Date.now(),
    endDate: Date.now() + 1 * 1000 * 1000 * 60 * 60 * 24 * 30,
    daysLeft: 43,
  },
  {
    id: 2,
    name: 'Kl',
    ward: WardValue.HOANG_SA,
    price: 100,
    area: 100,
    createdDate: Date.now(),
    endDate: Date.now() + 4 * 1000 * 1000 * 60 * 60 * 24 * 30,
    daysLeft: 34,
  },
  {
    id: 3,
    name: 'Kl',
    ward: WardValue.CAM_LE,
    price: 100,
    area: 100,
    createdDate: Date.now(),
    endDate: Date.now() + 5 * 1000 * 1000 * 60 * 60 * 24 * 30,
    daysLeft: 22,
  },
  {
    id: 4,
    name: 'Kl',
    ward: WardValue.CAM_LE,
    price: 100,
    area: 100,
    createdDate: Date.now(),
    endDate: Date.now() + 12 * 1000 * 1000 * 60 * 60 * 24 * 30,
    daysLeft: 21,
  },
  {
    id: 5,
    name: 'Kl',
    ward: WardValue.CAM_LE,
    price: 100,
    area: 100,
    createdDate: Date.now(),
    endDate: Date.now() + 7 * 1000 * 1000 * 60 * 60 * 24 * 30,
    daysLeft: 1,
  },
  {
    id: 6,
    name: 'Kl',
    ward: WardValue.CAM_LE,
    price: 100,
    area: 100,
    createdDate: Date.now(),
    endDate: Date.now() + 7 * 1000 * 1000 * 60 * 60 * 24 * 30,
    daysLeft: 70,
  },
  {
    id: 7,
    name: 'Kl',
    ward: WardValue.CAM_LE,
    price: 100,
    area: 100,
    createdDate: Date.now(),
    endDate: Date.now() + 7 * 1000 * 1000 * 60 * 60 * 24 * 30,
    daysLeft: 50,
  },
];

const ListWarehouse = () => {
  const onSelect = (id: number) => {};

  return (
    <GridContainer>
      {myWarehouseDetailsMock.map((it) => (
        <MyWarehouseViewCard key={it.id} warehouse={it} onClick={onSelect}></MyWarehouseViewCard>
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;

export default ListWarehouse;
