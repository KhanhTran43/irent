import { ReactNode } from 'react';
import styled from 'styled-components';

import { Loading } from '@/components/Fallback';
import { MyWarehouseViewCard, MyWarehouseViewCardType } from '@/components/MyWarehouseViewCard';
import { WareHouseModel } from '@/models/warehouse.model';

export type MyWarehouseCardListProps = {
  type: MyWarehouseViewCardType;
  warehouses: WareHouseModel[];
  loading?: boolean;
  fallback?: ReactNode;
};

export function MyWarehouseCardList({ type, warehouses, fallback, loading }: MyWarehouseCardListProps) {
  const renderList = () => {
    if (warehouses && warehouses.length > 0) {
      return (
        <MyWarehouseCardListRoot>
          <p>{warehouses.length} kho bãi</p>
          <GridContainer>
            {warehouses.map((it) => (
              <MyWarehouseViewCard key={it.id} type={type} warehouse={it}></MyWarehouseViewCard>
            ))}
          </GridContainer>
        </MyWarehouseCardListRoot>
      );
    } else return fallback;
  };

  return <>{loading ? <Loading /> : renderList()}</>;
}

const MyWarehouseCardListRoot = styled.div`
  --card-width: 300px;
`;

const GridContainer = styled.div`
  width: 100%;
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(4, var(--card-width));
  justify-content: space-between;
  row-gap: 10px;
`;
