import { Button, Datagrid, ListContextProvider, TextField, useGetList, useList } from 'react-admin';
import { useNavigate } from 'react-router-dom';

export const RequestWarehouseList = () => {
  const { data, isLoading } = useGetList('warehouse');
  const filteredData = (data || []).filter((it: any) => it.status === 0);
  const listContext = useList({ data: filteredData, isLoading });

  return (
    <>
      <h1>Kho bãi đang chờ duyệt</h1>
      <ListContextProvider value={listContext}>
        <Datagrid rowClick={(e) => String(e)}>
          <TextField source="id" />
          <TextField source="name" label="Tên" />
          <TextField source="address" label="Địa chỉ" />
          <TextField source="price" label="Giá" />
          <TextField source="area" label="Diện tích" />
          <TextField source="createdDate" label="Ngày tạo" />
        </Datagrid>
      </ListContextProvider>
    </>
  );
};

