import { Form, useFormikContext } from 'formik';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';

import { UploadImageButton } from '@/containers/UploadImageButton/UploadImageButton';

import { FieldError } from '../Common/Form';
import { WardSelect } from '../Common/WardSelect';
import { MapContainer, MapSearchBoxInput, useMapWithSearchBox } from '../Map';
import { CreateWarehouseFormValuesType } from './CreateWarehouseProvider';

export const CreateWarehouseForm = () => {
  const { handleSubmit, handleChange, handleBlur, values, setFieldValue } =
    useFormikContext<CreateWarehouseFormValuesType>();
  const { currentSearchPayload } = useMapWithSearchBox();

  useEffect(() => {
    setFieldValue('address', JSON.stringify(currentSearchPayload));
    setFieldValue('mapSearch', currentSearchPayload?.address);
  }, [currentSearchPayload]);

  return (
    <Container>
      <Title>Thông tin kho bãi</Title>
      <Form onSubmit={handleSubmit}>
        <Body>
          <ImageInfo>
            <Text>Ảnh</Text>
            <ImageInputContainer>
              <UploadImageButton url={values.image} onImageUploaded={(url) => setFieldValue('image', url)} />
            </ImageInputContainer>
          </ImageInfo>
          <TextInfo>
            <LeftSide>
              <FormField>
                <Label>Tên kho bãi</Label>
                <Input defaultValue={values.name} name="name" onBlur={handleBlur} onChange={handleChange} />
                <FieldError errorFor={'name'} />
              </FormField>
              <FormField>
                <Label>Địa chỉ</Label>
                <CreateWarehouseMapSearchBoxInput
                  defaultValue={values.mapSearch}
                  name="mapSearch"
                  placeholder=""
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FieldError errorFor={'address'} />
              </FormField>
              <FormField>
                <Label>Quận</Label>
                <WardSelect
                  allSelect
                  defaultValue={values.ward?.toString()}
                  name="ward"
                  triggerStyles={{
                    height: 50,
                  }}
                  onSelect={(value) => setFieldValue('ward', Number(value))}
                />
                <FieldError errorFor={'ward'} />
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
              <CreateFormMapContainer />
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

const Title = styled.h2``;

const FormField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
  }
`;

const Label = styled.label``;

const inputStyles = css`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid gray;
`;

const Input = styled.input`
  ${inputStyles}
`;

const CreateWarehouseMapSearchBoxInput = styled(MapSearchBoxInput)`
  ${inputStyles}
  width: inherit;
`;

const ImageInputContainer = styled.div``;

const Text = styled.span``;

const CreateFormMapContainer = styled(MapContainer)`
  height: 300px;
  width: 100%;
`;
