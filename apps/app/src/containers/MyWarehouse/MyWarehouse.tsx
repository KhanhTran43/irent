import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { Button } from '@/components/Common/Button';
import { Loading } from '@/components/Fallback';
import { MyWarehouseViewCardType } from '@/components/MyWarehouseViewCard';
import { Role } from '@/enums/role.enum';
import { useMyWarehouseStore } from '@/store/my-warehouse.store';

import { MyWarehouseCardList } from './MyWarehouseCardList';

export const MyWarehouse = () => {
  const { user } = useAuthStore();
  const { fetchMyWarehouses, loading, reset, warehouses } = useMyWarehouseStore();

  useEffect(() => {
    fetchMyWarehouses(user);

    return () => {
      reset();
    };
  }, []);

  const renderMyList = () => {
    if (loading) {
      return <Loading />;
    } else if (warehouses && warehouses.length > 0) {
      if (user?.role === Role.Renter)
        return <MyWarehouseCardList type={MyWarehouseViewCardType.Renting} warehouses={warehouses} />;
      else if (user?.role === Role.Owner)
        return <MyWarehouseCardList type={MyWarehouseViewCardType.Owning} warehouses={warehouses} />;
    } else {
      return (
        <NothingContainer>
          <h2>Chưa có gì ở đây</h2>
        </NothingContainer>
      );
    }
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
