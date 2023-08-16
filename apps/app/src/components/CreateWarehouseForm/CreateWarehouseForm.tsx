import { Form, useFormikContext } from 'formik';
import styled from 'styled-components';

import { FieldError } from '../Form';
import { CreateWarehouseFormValuesType } from './CreateWarehouseProvider';

export const CreateWarehouseForm = () => {
  const { handleSubmit, handleChange, handleBlur, values, isSubmitting } =
    useFormikContext<CreateWarehouseFormValuesType>();

  return (
    <Container>
      <Title>Thông tin kho bãi</Title>
      <Form onSubmit={handleSubmit}>
        <Body>
          <ImageInfo>
            <Text>Ảnh</Text>
            <ImageInputContainer>
              <ImageInput></ImageInput>
            </ImageInputContainer>
          </ImageInfo>
          <TextInfo>
            <LeftSide>
              <FormField>
                <Label>Tên</Label>
                <Input defaultValue={values.name} name="name" onBlur={handleBlur} onChange={handleChange} />
                <FieldError errorFor={'name'} />
              </FormField>
              <FormField>
                <Label>Quận</Label>
                <Input defaultValue={values.address} name="address" onBlur={handleBlur} onChange={handleChange} />
                <FieldError errorFor={'address'} />
              </FormField>
              <FormField>
                <Label>Diện tích</Label>
                <Input defaultValue={values.area} name="area" onBlur={handleBlur} onChange={handleChange} />
                <FieldError errorFor="area" />
              </FormField>
            </LeftSide>
            <RightSide>
              <FormField>
                <Label>Giá</Label>
                <Input defaultValue={values.price} name="price" onBlur={handleBlur} onChange={handleChange} />
                <FieldError errorFor={'price'} />
              </FormField>
            </RightSide>
          </TextInfo>
        </Body>
      </Form>
    </Container>
  );
};

const Container = styled.div``;

const Body = styled.div``;

const TextInfo = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 15px;
`;

const ImageInfo = styled.div`
  margin-bottom: 8px;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const ImageInputContainer = styled.div``;

const ImageInput = styled.input.attrs({ type: 'file' })``;

const Text = styled.span``;
