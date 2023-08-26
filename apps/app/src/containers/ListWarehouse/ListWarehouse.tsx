import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { Button } from '@/components/Common/Button';
import { MyWarehouseViewCard } from '@/components/MyWarehouseViewCard/MyWarehouseViewCard';

import { api } from '../../axios/axios';
import { MyWarehouseDetailsModel } from '../../models/my-warehouse-details.model';

export const MyWarehouse = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [warehouses, setWarehouses] = useState<MyWarehouseDetailsModel[]>([]);

  const onSelect = (id: number) => {
    navigate(`/warehouse/${id}`);
  };

  useEffect(() => {
    if (user)
      api.get<MyWarehouseDetailsModel[]>(`warehouse/owner/${user.id}`).then(({ data }) => {
        if (data.length !== 0) setWarehouses(data);
      });
  }, []);

  return (
    <>
      <Button>
        <Link to={'/create'}>Tạo kho bãi</Link>
      </Button>
      <GridContainer>
        {warehouses.map((it) => (
          <MyWarehouseViewCard key={it.id} warehouse={it} onClick={onSelect}></MyWarehouseViewCard>
        ))}
      </GridContainer>
    </>
  );
};

const GridContainer = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;
