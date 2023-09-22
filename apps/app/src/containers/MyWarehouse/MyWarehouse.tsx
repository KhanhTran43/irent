import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { Button } from '@/components/Common/Button';
import { Loading } from '@/components/Fallback';
import { MyWarehouseViewCard } from '@/components/MyWarehouseViewCard/MyWarehouseViewCard';
import { Role } from '@/enums/role.enum';
import rentedWarehouseService from '@/service/rented-warehouse-service';
import warehouseService from '@/service/warehouse-service';
import { useMyWarehouseStore } from '@/store/my-warehouse.store';

import { MyWarehouseDetailsModel } from '../../models/my-warehouse-details.model';

export const MyWarehouse = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [warehouses, setWarehouses] = useState<MyWarehouseDetailsModel[]>();
  const [isLoading, setLoading] = useState(true);

  const onSelect = (id: number) => {
    navigate(`/warehouse/${id}`);
  };

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case Role.Owner:
          warehouseService.getOwnerWarehouse(user.id).then((data) => {
            if (data && data.length !== 0) setWarehouses(data);
            setLoading(false);
          });
          break;
        case Role.Renter:
          rentedWarehouseService.getRenterWarehouses(user.id).then((data) => {
            if (data && data.length !== 0) setWarehouses(data);
            setLoading(false);
          });
          break;
        default:
          break;
      }
    } else setLoading(false);
  }, []);

  const renderMyList = () => {
    if (isLoading) {
      return <Loading />;
    } else if (warehouses && warehouses.length > 0) {
      return (
        <GridContainer>
          {warehouses.map((it) => (
            <MyWarehouseViewCard key={it.id} warehouse={it} onClick={onSelect}></MyWarehouseViewCard>
          ))}
        </GridContainer>
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
        <Link to="/create">
          <Button>Tạo kho bãi</Button>
        </Link>
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
`;

const NothingContainer = styled.div`
  color: gray;
  text-align: center;
`;
