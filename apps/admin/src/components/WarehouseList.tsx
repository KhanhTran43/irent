import { Datagrid, List, TextField } from 'react-admin';

export const WarehouseList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Tên" />
      <TextField source="address.address" label="Địa chỉ" />
      <TextField source="price" label="Giá"/>
      <TextField source="floors" label="Tầng"/>
      <TextField source="doors" label="Cửa"/>
      <TextField source="area" label="Diện tích"/>
    </Datagrid>
  </List>
);
