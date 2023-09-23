import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { Button } from '@/components/Common/Button';
import { Tabs } from '@/components/Common/Tabs';
import { MyWarehouseViewCardType } from '@/components/MyWarehouseViewCard';
import { Role } from '@/enums/role.enum';
import { useMyWarehouseStore } from '@/store/my-warehouse.store';

import { MyWarehouseCardList } from './MyWarehouseCardList';

export const MyWarehouse = () => {
  const { user } = useAuthStore();
  const { fetchMyWarehouses, reset, ownWarehousesLoading, rentedWarehouses, ownWarehouse, rentedWarehousesLoading } =
    useMyWarehouseStore();

  useEffect(() => {
    fetchMyWarehouses(user);

    return () => {
      reset();
    };
  }, []);

  const renderNoContent = () => {
    return (
      <NothingContainer>
        <h2>Chưa có gì ở đây</h2>
      </NothingContainer>
    );
  };

  const renderMyList = () => {
    if (user?.role === Role.Renter)
      return (
        <MyWarehouseCardList
          fallback={renderNoContent()}
          loading={rentedWarehousesLoading}
          type={MyWarehouseViewCardType.Renting}
          warehouses={rentedWarehouses}
        />
      );
    else if (user?.role === Role.Owner)
      return (
        <Tabs
          tabs={[
            {
              tab: 'Kho bãi',
              content: (
                <MyWarehouseCardList
                  fallback={renderNoContent()}
                  loading={rentedWarehousesLoading}
                  type={MyWarehouseViewCardType.Owning}
                  warehouses={ownWarehouse}
                />
              ),
            },
            {
              tab: 'Lịch sử',
              content: (
                <MyWarehouseCardList
                  fallback={renderNoContent()}
                  loading={ownWarehousesLoading}
                  type={MyWarehouseViewCardType.History}
                  warehouses={rentedWarehouses}
                />
              ),
            },
          ]}
        ></Tabs>
      );
  };

  return (
    <>
      {user?.role === Role.Owner && (
        <CreateWareHouse>
          <Link to="/create">
            <Button>Tạo kho bãi</Button>
          </Link>
        </CreateWareHouse>
      )}
      {renderMyList()}
    </>
  );
};

const CreateWareHouse = styled.div`
  text-align: right;
`;

const NothingContainer = styled.div`
  color: gray;
  text-align: center;
`;
