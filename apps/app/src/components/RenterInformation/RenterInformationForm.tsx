import { Form, useFormikContext } from 'formik';
import { useState } from 'react';
import styled from 'styled-components';

import { UserModel } from '../../models/user.model';
import { useWarehouseResolver } from '../../resolver/WarehouseResolver';
import { formatPrice } from '../../utils/format-price.util';
import { FieldError } from '../Common/Form';

export type RenterInformationFormProps = {
  setRenterInfo: (info: UserModel) => void;
};

export const RenterInformationForm = (props: RenterInformationFormProps) => {
  const { setRenterInfo } = props;
  const [duration, setDuration] = useState(1);
  const {
    warehouse: { price },
  } = useWarehouseResolver();

  const [user] = useState<UserModel>({
    id: 1,
    name: 'Trần Quốc Khánh',
    email: 'khanhbeo@gmail.com',
    ioc: '201797784',
    phoneNumber: '0123456789',
  });

  const { handleSubmit, handleChange, handleBlur, values } = useFormikContext();

  return (
    <Container>
      <Title>Thông tin người thuê</Title>
      <Form onSubmit={handleSubmit}>
        <Body>
          <LeftSide>
            {/* <FormField>
              <Label>Tên</Label>
              <Input name="name" onChange={handleChange} onBlur={handleBlur} />
              <FieldError errorFor="name" />
            </FormField>
            <FormField>
              <Label>Số điện thoại</Label>
              <Input name="phoneNumber" onChange={handleChange} onBlur={handleBlur} />
              <FieldError errorFor="phoneNumber" />
            </FormField>
            <FormField>
              <Label>Email</Label>
              <Input name="email" onChange={handleChange} onBlur={handleBlur} />
              <FieldError errorFor="email" />
            </FormField>
            <FormField>
              <Label>CMND/CCCD</Label>
              <Input name="ioc" onChange={handleChange} onBlur={handleBlur} />
              <FieldError errorFor="ioc" />
            </FormField> */}
            <PriceContainer>Giá thuê: {formatPrice(price)} VND</PriceContainer>
          </LeftSide>

          <RightSide>
            <FormField>
              <Label>Thời hạn thuê (tháng)</Label>
              <Input
                min="1"
                name="duration"
                type="number"
                onChange={(v) => {
                  setDuration(+v.target.value);

                  handleChange(v);
                }}
                defaultValue={values.duration}
                onBlur={handleBlur}
              />
            </FormField>
            <FieldError errorFor="duration" />
            <Text>Thành tiền: {formatPrice(price * duration)} VND</Text>
          </RightSide>
        </Body>
      </Form>
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

const PriceContainer = styled.h3``;
