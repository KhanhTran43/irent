import { BooleanField, DateField, NumberField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const TransactionDetails = () => (
  <Show>
    <SimpleShowLayout className='detail-layout'>
      <TextField source="id" label="Id" />
      <TextField source="warehouse.name" label="Tên kho bãi"/>
      <TextField source="owner.name" label="Chủ sở hữu" />
      <TextField source="renter.name" label="Người thuê" />
      <NumberField source="price" label="Giá (VND)"/>
      <TextField source="duration" label="Thời hạn (tháng)"/>
      <DateField source="createdAt" label="Thời gian tạo" showTime={true}/>
      <BooleanField source="isConfirmed" label="Tình trạng" valueLabelTrue="Đã xác nhận" valueLabelFalse='Chưa xác nhận' />
    </SimpleShowLayout>
  </Show>
);
