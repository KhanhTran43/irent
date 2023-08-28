import { useState } from 'react';
import {
  BooleanField,
  Button,
  Confirm,
  DateField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
  useShowController,
} from 'react-admin';

export const TransactionDetails = () => {
  const { record } = useShowController();
  const [isContractOpen, setContractOpen] = useState(false);

  console.log(record);

  return (
    <Show>
      <SimpleShowLayout className="detail-layout">
        <TextField label="Id" source="id" />
        <TextField label="Tên kho bãi" source="name" />
        <TextField label="Chủ sở hữu" source="userId" />
        <TextField label="Người thuê" source="rentedInfo.renterId" />
        <NumberField label="Giá (VND)" source="price" />
        <DateField label="Ngày thuê" source="rentedInfo.rentedDate" />
        <DateField label="Ngày kết thúc" source="rentedInfo.endDate" />
        <DateField label="Thời gian tạo" showTime={true} source="createdDate" />
        <BooleanField label="Tình trạng" source="rented" valueLabelFalse="Chưa thuê" valueLabelTrue="Đang thuê" />
        <Button onClick={() => setContractOpen(true)}>
          <>{'View contract'}</>
        </Button>
        <Confirm
          confirm="Ok"
          content={
            <div
              style={{
                height: 'calc(100vh - 200px)',
                width: 1280,
              }}
            >
              <embed
                src={`data:application/pdf;base64,${record ? record.rentedInfo.contractBase64 : ''}`}
                style={{
                  height: '100%',
                  width: 'calc(100% - 2*24px)',
                }}
                type="application/pdf"
              ></embed>
            </div>
          }
          isOpen={isContractOpen}
          maxWidth={false}
          scroll="body"
          style={{ height: '100%' }}
          title="Contract"
          onClose={() => {
            setContractOpen(false);
          }}
          onConfirm={() => setContractOpen(false)}
        ></Confirm>
      </SimpleShowLayout>
    </Show>
  );
};
