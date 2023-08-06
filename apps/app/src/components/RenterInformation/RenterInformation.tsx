import { Formik } from 'formik';
import { useState } from 'react';
import styled from 'styled-components';

import { UserModel } from '../../models/user.model';
import { formatPrice } from '../../utils/format-price.util';
import Button from '../Button/Button';

type RenterInformationProps = {
  price: number;
  setRenterInfo: (info: UserModel) => void;
};

const RenterInformation = (props: RenterInformationProps) => {
  const { price, setRenterInfo } = props;
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
      <Formik
        initialValues={{ name: '', phoneNumber: '', email: '', ioc: '', duration: '' }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Body>
              <LeftSide>
                <FormField>
                  <Label>Tên</Label>
                  <Input name="name" onChange={handleChange} />
                </FormField>
                <FormField>
                  <Label>Số điện thoại</Label>
                  <Input name="phoneNumber" onChange={handleChange} />
                </FormField>
                <FormField>
                  <Label>Email</Label>
                  <Input name="email" onChange={handleChange} />
                </FormField>
                <FormField>
                  <Label>CMND/CCCD</Label>
                  <Input name="ioc" onChange={handleChange} />
                </FormField>
              </LeftSide>

              <RightSide>
                <FormField>
                  <Label>Thời hạn thuê (tháng)</Label>
                  <Input
                    min="1"
                    type="number"
                    onChange={(v) => {
                      setDuration(+v.target.value);

                      handleChange(v);
                    }}
                    name="duration"
                  />
                </FormField>
                <Text>Thành tiền: {formatPrice(price * duration)} VND</Text>
              </RightSide>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Body>
          </form>
        )}
      </Formik>
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

