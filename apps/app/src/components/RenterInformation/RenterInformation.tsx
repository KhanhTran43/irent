import { useState } from 'react';
import styled from 'styled-components';
import { UserModel } from '../../models/user.model';
import { formatPrice } from '../../utils/format-price.util';

interface RenterInformationProps {
  price: number;
}

const RenterInformation = (props: RenterInformationProps) => {
  const { price } = props;
  const [duration, setDuration] = useState(1);

  const [user] = useState<UserModel>({
    id: 1,
    name: 'Trần Quốc Khánh',
    email: 'khanhbeo@gmail.com',
    ioc: '201797784',
    phoneNumber: '0123456789',
  });

  return (
    <Container>
      <Title>Thông tin người thuê</Title>
      <Body>
        <LeftSide>
          <FormField>
            <Label>Tên</Label>
            <Input value={user.name} />
          </FormField>
          <FormField>
            <Label>Số điện thoại</Label>
            <Input value={user.phoneNumber} />
          </FormField>
          <FormField>
            <Label>Email</Label>
            <Input value={user.email} />
          </FormField>
          <FormField>
            <Label>CMND/CCCD</Label>
            <Input value={user.ioc} />
          </FormField>
        </LeftSide>

        <RightSide>
          <FormField>
            <Label>Thời hạn thuê (tháng)</Label>
            <Input
              defaultValue={1}
              type="number"
              min="1"
              onChange={(v) => {
                setDuration(+v.target.value);
              }}
            />
          </FormField>
          <Text>Thành tiền: {formatPrice(price * duration)} VND</Text>
        </RightSide>
      </Body>
    </Container>
  );
};

const Container = styled.div``;

const Body = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1``;

const FormField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
  }
`;

const Label = styled.label``;

const Input = styled.input`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid gray;
`;

const Text = styled.span``;

export default RenterInformation;
