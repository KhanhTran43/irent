import styled from 'styled-components';

const CreateWarehouseForm = () => {
  return (
    <Container>
      <Title>Thông tin kho bãi</Title>
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
              <Input />
            </FormField>
            <FormField>
              <Label>Quận</Label>
              <Input />
            </FormField>
            <FormField>
              <Label>Diện tích</Label>
              <Input />
            </FormField>
            <FormField>
              <Label>Số cửa</Label>
              <Input />
            </FormField>
            <FormField>
              <Label>Số tầng</Label>
              <Input />
            </FormField>
          </LeftSide>
          <RightSide>
            <FormField>
              <Label>Giá</Label>
              <Input/>
            </FormField>
            <FormField>
              <Label>Thời gian thuê tối thiểu (tháng)</Label>
              <Input/>
            </FormField>
          </RightSide>
        </TextInfo>
      </Body>
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

const ImageInfo = styled.div``

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

const ImageInputContainer = styled.div``

const ImageInput = styled.input.attrs({ type: 'file' })``

const Text = styled.span``;
