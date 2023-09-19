import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { Button } from '@/components/Common/Button';
import { MyWarehouseViewCard } from '@/components/MyWarehouseViewCard/MyWarehouseViewCard';
import { Role } from '@/enums/role.enum';
import warehouseService from '@/service/warehouse-service';

import { MyWarehouseDetailsModel } from '../../models/my-warehouse-details.model';

export const MyWarehouse = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [warehouses, setWarehouses] = useState<MyWarehouseDetailsModel[]>([]);

  const onSelect = (id: number) => {
    navigate(`/warehouse/${id}`);
  };

  console.log(user);

  useEffect(() => {
    if (user) {
      warehouseService.getMyWarehouse(user.id, user.role).then((data) => {
        if (data && data.length !== 0) setWarehouses(data);
      });
    }
  }, []);

  return (
    <>
      {user?.role === Role.Owner && (
        <Link to="/create">
          <Button>Tạo kho bãi</Button>
        </Link>
      )}
      {warehouses.length > 0 ? (
        <GridContainer>
          {warehouses.map((it) => (
            <MyWarehouseViewCard
              key={it.id}
              showRentedProgression={it.rented}
              warehouse={it}
              onClick={onSelect}
            ></MyWarehouseViewCard>
          ))}
        </GridContainer>
      ) : (
        <NothingContainer>
          <h2>Chưa có gì ở đây</h2>
        </NothingContainer>
      )}
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
