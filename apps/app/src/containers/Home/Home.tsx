import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PriceRangeSlider } from '@/components/Common/PriceRangeSlider';
import { WardSelect } from '@/components/Common/WardSelect';
import { WardValue } from '@/enums/ward-value.enum';

import { api } from '../../axios/axios';
import { WarehouseViewCard } from '../../components/WarehouseViewCard/WarehouseViewCard';
import { WareHouseModel } from '../../models/warehouse.model';

// const mockWareHouses: WareHouseModel[] = [
//   {
//     id: 1,
//     userId: 1,
//     name: 'A1',
//     ward: WardValue.CAM_LE,
//     price: 5.4,
//     area: 100,
//     createdDate: Date.now(),
//   },
//   {
//     id: 2,
//     userId: 1,
//     name: 'A2',
//     ward: WardValue.HOANG_SA,
//     area: 100,
//     price: 5.3,
//     createdDate: Date.now(),
//   },
//   {
//     id: 3,
//     userId: 1,
//     name: 'A3',
//     ward: WardValue.THANH_KHE,
//     area: 100,
//     price: 1.9,
//     createdDate: Date.now(),
//   },
//   {
//     id: 4,
//     userId: 1,
//     name: 'A4',
//     ward: WardValue.CAM_LE,
//     area: 100,
//     price: 6.4,
//     createdDate: Date.now(),
//   },
//   {
//     id: 5,
//     userId: 1,
//     name: 'A5',
//     ward: WardValue.HOANG_SA,
//     area: 100,
//     price: 5.4,
//     createdDate: Date.now(),
//   },
//   {
//     id: 6,
//     userId: 1,
//     name: 'A6',
//     ward: WardValue.HOA_VANG,
//     area: 100,
//     price: 5.3,
//     createdDate: Date.now(),
//   },
//   {
//     id: 7,
//     userId: 1,
//     name: 'A7',
//     ward: WardValue.HOANG_SA,
//     area: 100,
//     price: 1.9,
//     createdDate: Date.now(),
//   },
//   {
//     id: 8,
//     userId: 1,
//     name: 'A8',
//     ward: WardValue.NGU_HANH_SON,
//     area: 100,
//     price: 6.4,
//     createdDate: Date.now(),
//   },
//   {
//     id: 9,
//     userId: 1,
//     name: 'A4',
//     ward: WardValue.HOANG_SA,
//     area: 100,
//     price: 6.4,
//     createdDate: Date.now(),
//   },
//   {
//     id: 10,
//     userId: 1,
//     name: 'A5',
//     ward: WardValue.HAI_CHAU,
//     area: 100,
//     price: 5.4,
//     createdDate: Date.now(),
//   },
//   {
//     id: 11,
//     userId: 1,
//     name: 'A6',
//     ward: WardValue.HAI_CHAU,
//     area: 100,
//     price: 5.3,
//     createdDate: Date.now(),
//   },
//   {
//     id: 12,
//     userId: 1,
//     name: 'A7',
//     ward: WardValue.LIEN_CHIEU,
//     area: 100,
//     price: 1.9,
//     createdDate: Date.now(),
//   },
//   {
//     id: 13,
//     userId: 1,
//     name: 'A8',
//     ward: WardValue.NGU_HANH_SON,
//     area: 100,
//     price: 6.4,
//     createdDate: Date.now(),
//   },
// ];

export const Home = () => {
  const [warehouses, setWarehouses] = useState<WareHouseModel[]>([]);
  const warehouseRef = useRef<WareHouseModel[]>();
  const navigate = useNavigate();
  const [priceFilter, setPriceFilter] = useState<[number, number]>();
  const [wardFilter, setWardFilter] = useState<WardValue>();

  useEffect(() => {
    api.get<WareHouseModel[]>('warehouse').then(({ data }) => {
      if (data.length !== 0) {
        const notRentedWarehouse = data.filter((d) => !d.rented);
        warehouseRef.current = notRentedWarehouse;
        setWarehouses(warehouseRef.current);
      }
    });
  }, []);

  useEffect(() => {
    if (warehouseRef.current) {
      let filterResult = warehouseRef.current;
      if (priceFilter)
        filterResult = filterResult.filter(
          (warehouse) => warehouse.price >= priceFilter[0] && warehouse.price <= priceFilter[1],
        );
      if (wardFilter)
        filterResult = filterResult.filter(
          (warehouse) => WardValue[warehouse.ward as keyof typeof WardValue] === wardFilter,
        );
      setWarehouses(filterResult);
    }
  }, [priceFilter, wardFilter]);

  // TODO: If we call api to search, this code should be removed
  // const onFilter = (value: [number, number] | string, type: 'ward' | 'price') => {
  //   setWarehouses(
  //     mockWareHouses.filter((it) => {
  //       let flag = false;

  //       if (type === 'ward') {
  //         flag =
  //           value === WardValue.ALL ? true : it.ward?.toLowerCase().includes((value as string).toLowerCase()) ?? false;
  //       }

  //       if (type === 'price') {
  //         const searchValue = value as [number, number];
  //         flag = it.price >= searchValue[0] && it.price <= searchValue[1];
  //       }

  //       return flag;
  //     }),
  //   );
  // };

  const navigateToDetails = (id: number) => {
    navigate(`/warehouse/${id}`);
  };

  return (
    <>
      <FilterContainer>
        <WardSelect onSelect={(value: string) => setWardFilter(Number(value))} />
        <PriceRangeSlider max={50000} min={100} onInput={(value: [number, number]) => setPriceFilter(value)} />
      </FilterContainer>

      <GridContainer>
        {warehouses.map((it) => (
          <WarehouseViewCard key={it.id} warehouse={it} onClick={navigateToDetails}></WarehouseViewCard>
        ))}
      </GridContainer>
    </>
  );
};

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
