import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { api } from '../../axios/axios';
import MyWarehouseViewCard from '../../components/MyWarehouseViewCard/MyWarehouseViewCard';
import { WardValue } from '../../enums/ward-value.enum';
import { MyWarehouseDetailsModel } from '../../models/my-warehouse-details.model';

const myWarehouseDetailsMock: MyWarehouseDetailsModel[] = [
  {
    id: 1,
    userId: 1,
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
    userId: 1,
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
    userId: 1,
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
    userId: 2,
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
    userId: 2,
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
    userId: 2,
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
    userId: 3,
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
  const navigate = useNavigate();
  const onSelect = (id: number) => {
    navigate(`/warehouse/${id}`);
  };
  const [warehouses, setWarehouses] = useState<MyWarehouseDetailsModel[]>(myWarehouseDetailsMock);

  useEffect(() => {
    api.get<MyWarehouseDetailsModel[]>('warehouse').then(({ data }) => {
      if (data.length !== 0) setWarehouses(data);
    });
  }, []);

  return (
    <GridContainer>
      {warehouses.map((it) => (
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
