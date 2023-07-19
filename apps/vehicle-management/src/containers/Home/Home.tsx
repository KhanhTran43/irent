import { useState } from 'react';
import { WareHouseModel } from '../../models/warehouse.model';
import WarehouseViewCard from '../../components/WarehouseViewCard/WarehouseViewCard';
import styled from 'styled-components';
import SearchBar from '../../components/SearchBar/SearchBar';
import PriceRangeSlider from '../../components/PriceRangeSlider/PriceRangeSlider';
import { FilterWarehouseOptionModel } from '../../models/filter-warehouse-option.model';

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
    id: 9,
    name: 'A4',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 6.4,
    createdDate: Date.now(),
  },
  {
    id: 10,
    name: 'A5',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 5.4,
    createdDate: Date.now(),
  },
  {
    id: 11,
    name: 'A6',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 5.3,
    createdDate: Date.now(),
  },
  {
    id: 12,
    name: 'A7',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 1.9,
    createdDate: Date.now(),
  },
  {
    id: 13,
    name: 'A8',
    address: 'Hoà Hải, Đà Nẵng',
    area: 100,
    price: 6.4,
    createdDate: Date.now(),
  },
];

const Home = () => {
  const [wareHouses, setWareHouse] = useState<WareHouseModel[]>(mockWareHouses);

  // TODO: If we call api to search, this code should be removed
  const onFilter = (options: FilterWarehouseOptionModel) => {
    const { query, priceRange } = options;

    setWareHouse(
      mockWareHouses.filter((it) => {
        let flag = false;

        if (query) {
          flag = it.address.toLowerCase().includes(query.toLowerCase());
        }

        if (priceRange) {
          flag = it.price >= priceRange[0] && it.price <= priceRange[1];
        }

        return flag;
      })
    );
  };

  return (
    <>
      <FilterContainer>
        <SearchBar
          onSearch={onFilter}
          placeholder="Search warehouse by address"
        />
        <PriceRangeSlider min={1} max={100} onInput={onFilter} />
      </FilterContainer>

      <GridContainer>
        {wareHouses.map((it) => (
          <WarehouseViewCard key={it.id} {...it}></WarehouseViewCard>
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
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;
