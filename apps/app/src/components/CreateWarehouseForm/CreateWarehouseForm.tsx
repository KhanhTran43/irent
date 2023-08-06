import { Formik } from 'formik';
import styled from 'styled-components';

import { WardValue } from '../../enums/ward-value.enum';
import Button from '../Button/Button';

const CreateWarehouseForm = () => {
  return (
    <Container>
      <Title>Thông tin kho bãi</Title>
      <Formik
        initialValues={{
          name: '',
          ward: WardValue.CAM_LE,
          area: 0,
          doorQty: 0,
          floors: 0,
          minimumMonth: 0,
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
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
                    <Input name="name" onChange={handleChange} />
                  </FormField>
                  <FormField>
                    <Label>Quận</Label>
                    <Input name="ward" onChange={handleChange} />
                  </FormField>
                  <FormField>
                    <Label>Diện tích</Label>
                    <Input name="area" onChange={handleChange} />
                  </FormField>
                  <FormField>
                    <Label>Số cửa</Label>
                    <Input name="doorQty" onChange={handleChange} />
                  </FormField>
                  <FormField>
                    <Label>Số tầng</Label>
                    <Input name="floors" onChange={handleChange} />
                  </FormField>
                </LeftSide>
                <RightSide>
                  <FormField>
                    <Label>Giá</Label>
                    <Input name="price" onChange={handleChange} />
                  </FormField>
                  <FormField>
                    <Label>Thời gian thuê tối thiểu (tháng)</Label>
                    <Input name="minimumMonth" onChange={handleChange} />
                  </FormField>
                </RightSide>
              </TextInfo>
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

export default CreateWarehouseForm;

const Container = styled.div``;

const Body = styled.div``;

const TextInfo = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);
`;

const ImageInfo = styled.div``;

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

const ImageInputContainer = styled.div``;

const ImageInput = styled.input.attrs({ type: 'file' })``;

const Text = styled.span``;

