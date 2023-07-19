import { useState } from 'react';
import { WareHouseModel } from '../../models/warehouse.model';
import WarehouseViewCard from '../../components/WarehouseViewCard/WarehouseViewCard';
import styled from 'styled-components';
import SearchBar from '../../components/SearchBar/SearchBar';

const mockWareHouses: WareHouseModel[] = [
  {
    id: 1,
    name: 'A1',
    address: 'Hoà Hải, Đà Nẵng',
    price: 5.4,
    area: 100,
    createdDate: Date.now(),
  },
  {
    id: 2,
    name: 'A2',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 5.3,
    createdDate: Date.now(),
  },
  {
    id: 3,
    name: 'A3',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 1.9,
    createdDate: Date.now(),
  },
  {
    id: 4,
    name: 'A4',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 6.4,
    createdDate: Date.now(),
  },
  {
    id: 5,
    name: 'A5',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 5.4,
    createdDate: Date.now(),
  },
  {
    id: 6,
    name: 'A6',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 5.3,
    createdDate: Date.now(),
  },
  {
    id: 7,
    name: 'A7',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 1.9,
    createdDate: Date.now(),
  },
  {
    id: 8,
    name: 'A8',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 6.4,
    createdDate: Date.now(),
  },
  {
    id: 4,
    name: 'A4',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 6.4,
    createdDate: Date.now(),
  },
  {
    id: 5,
    name: 'A5',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 5.4,
    createdDate: Date.now(),
  },
  {
    id: 6,
    name: 'A6',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 5.3,
    createdDate: Date.now(),
  },
  {
    id: 7,
    name: 'A7',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 1.9,
    createdDate: Date.now(),
  },
  {
    id: 8,
    name: 'A8',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 6.4,
    createdDate: Date.now(),
  },
];

const Home = () => {
  const [warehouses, setWareHouse] = useState<WareHouseModel[]>(mockWareHouses);

  return (
    <>
      <SearchBar />
      <GridContainer>
        {mockWareHouses.map((it) => (
          <WarehouseViewCard key={it.id} {...it}></WarehouseViewCard>
        ))}
      </GridContainer>
    </>
  );
};

export default Home;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;
