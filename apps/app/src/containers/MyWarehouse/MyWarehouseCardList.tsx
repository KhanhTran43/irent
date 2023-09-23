import styled from 'styled-components';

import { Loading } from '@/components/Fallback';
import { MyWarehouseViewCard, MyWarehouseViewCardType } from '@/components/MyWarehouseViewCard';
import { WareHouseModel } from '@/models/warehouse.model';

export type MyWarehouseCardListProps = {
  type: MyWarehouseViewCardType;
  warehouses: WareHouseModel[];
  loading?: boolean;
};

export function MyWarehouseCardList({ type, warehouses, loading }: MyWarehouseCardListProps) {
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <MyWarehouseCardListRoot>
          <p>{warehouses.length} kho bãi</p>
          <GridContainer>
            {warehouses.map((it) => (
              <MyWarehouseViewCard key={it.id} type={type} warehouse={it}></MyWarehouseViewCard>
            ))}
          </GridContainer>
        </MyWarehouseCardListRoot>
      )}
    </>
  );
}

const MyWarehouseCardListRoot = styled.div``;

const GridContainer = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;
