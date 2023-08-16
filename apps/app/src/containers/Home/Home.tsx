import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PriceRangeSlider from '../../components/PriceRangeSlider/PriceRangeSlider';
import WardSelect from '../../components/WardSelect/WardSelect';
import WarehouseViewCard from '../../components/WarehouseViewCard/WarehouseViewCard';
import { WardValue } from '../../enums/ward-value.enum';
import { WareHouseModel } from '../../models/warehouse.model';

const mockWareHouses: WareHouseModel[] = [
  {
    id: 1,
    name: 'A1',
    ward: WardValue.CAM_LE,
    price: 5.4,
    area: 100,
    createdDate: Date.now(),
  },
  {
    id: 2,
    name: 'A2',
    ward: WardValue.HOANG_SA,
    area: 100,
    price: 5.3,
    createdDate: Date.now(),
  },
  {
    id: 3,
    name: 'A3',
    ward: WardValue.THANH_KHE,
    area: 100,
    price: 1.9,
    createdDate: Date.now(),
  },
  {
    id: 4,
    name: 'A4',
    ward: WardValue.CAM_LE,
    area: 100,
    price: 6.4,
    createdDate: Date.now(),
  },
  {
    id: 5,
    name: 'A5',
    ward: WardValue.HOANG_SA,
    area: 100,
    price: 5.4,
    createdDate: Date.now(),
  },
  {
    id: 6,
    name: 'A6',
    ward: WardValue.HOA_VANG,
    area: 100,
    price: 5.3,
    createdDate: Date.now(),
  },
  {
    id: 7,
    name: 'A7',
    ward: WardValue.HOANG_SA,
    area: 100,
    price: 1.9,
    createdDate: Date.now(),
  },
  {
    id: 8,
    name: 'A8',
    ward: WardValue.NGU_HANH_SON,
    area: 100,
    price: 6.4,
    createdDate: Date.now(),
  },
  {
    id: 9,
    name: 'A4',
    ward: WardValue.HOANG_SA,
    area: 100,
    price: 6.4,
    createdDate: Date.now(),
  },
  {
    id: 10,
    name: 'A5',
    ward: WardValue.HAI_CHAU,
    area: 100,
    price: 5.4,
    createdDate: Date.now(),
  },
  {
    id: 11,
    name: 'A6',
    ward: WardValue.HAI_CHAU,
    area: 100,
    price: 5.3,
    createdDate: Date.now(),
  },
  {
    id: 12,
    name: 'A7',
    ward: WardValue.LIEN_CHIEU,
    area: 100,
    price: 1.9,
    createdDate: Date.now(),
  },
  {
    id: 13,
    name: 'A8',
    ward: WardValue.NGU_HANH_SON,
    area: 100,
    price: 6.4,
    createdDate: Date.now(),
  },
];

const Home = () => {
  const [wareHouses, setWareHouse] = useState<WareHouseModel[]>(mockWareHouses);
  const navigate = useNavigate();

  // TODO: If we call api to search, this code should be removed
  const onFilter = (value: [number, number] | string, type: 'ward' | 'price') => {
    setWareHouse(
      mockWareHouses.filter((it) => {
        let flag = false;

        if (type === 'ward') {
          flag =
            value === WardValue.ALL ? true : it.ward?.toLowerCase().includes((value as string).toLowerCase()) ?? false;
        }

        if (type === 'price') {
          const searchValue = value as [number, number];
          flag = it.price >= searchValue[0] && it.price <= searchValue[1];
        }

        return flag;
      }),
    );
  };

  const navigateToDetails = (id: number) => {
    navigate(`/warehouse/${id}`);
  };

  console.log(mockWareHouses);

  return (
    <>
      <FilterContainer>
        <WardSelect onSelect={(value: string) => onFilter(value, 'ward')} />
        <PriceRangeSlider max={100} min={1} onInput={(value: [number, number]) => onFilter(value, 'price')} />
      </FilterContainer>

      <GridContainer>
        {wareHouses.map((it) => (
          <WarehouseViewCard key={it.id} warehouse={it} onClick={navigateToDetails}></WarehouseViewCard>
        ))}
      </GridContainer>
    </>
  );
};

export default Home;

const FilterContainer = styled.div`
  display: flex;
  margin-bottom: 48px;
  gap: 24px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;
