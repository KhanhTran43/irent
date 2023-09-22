import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { Button } from '@/components/Common/Button';
import { Loading } from '@/components/Fallback';
import { MyWarehouseViewCard } from '@/components/MyWarehouseViewCard/MyWarehouseViewCard';
import { Role } from '@/enums/role.enum';
import { useMyWarehouseStore } from '@/store/my-warehouse.store';

export const MyWarehouse = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { fetchMyWarehouses, loading, reset, warehouses } = useMyWarehouseStore();

  const onSelect = (id: number) => {
    navigate(`/warehouse/${id}`);
  };

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
      return (
        <>
          <p>{warehouses.length} kho bãi</p>
          <GridContainer>
            {warehouses.map((it) => (
              <MyWarehouseViewCard key={it.id} warehouse={it} onClick={onSelect}></MyWarehouseViewCard>
            ))}
          </GridContainer>
        </>
      );
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

const GridContainer = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  min-height: 600px;
`;

const CreateWareHouse = styled.div`
  text-align: right;
`;

const NothingContainer = styled.div`
  color: gray;
  text-align: center;
`;

