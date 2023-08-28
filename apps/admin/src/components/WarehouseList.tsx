import { BooleanField, Datagrid, List, TextField } from 'react-admin';

export const WarehouseList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" label="Tên" />
      <TextField source="address" label="Địa chỉ" />
      <TextField source="price" label="Giá" />
      <TextField source="floors" label="Tầng" />
      <TextField source="doors" label="Cửa" />
      <TextField source="area" label="Diện tích" />
      <BooleanField source="rented" label="Đã thuê" />
    </Datagrid>
  </List>
);
