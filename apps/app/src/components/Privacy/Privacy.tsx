import styled from 'styled-components';

import { PRIVACY } from '../../constants/privacy.constant';

const Privacy = () => {
  return (
    <Container>
      <Title>Điều khoản và dịch vụ</Title>
      <Body>
        <Paragraph>
          {PRIVACY.map((it) => (
            <div key={it.title}>
              <SubTitle>{it.title}</SubTitle>
              <Text>{it.details}</Text>
            </div>
          ))}
        </Paragraph>
      </Body>
      <CheckboxGroup>
        <Checkbox id="agree-checkbox" />
        <Label htmlFor="agree-checkbox">Tôi đồng ý với điều khoản trên</Label>
      </CheckboxGroup>
    </Container>
  );
};

const Container = styled.div``;
const Title = styled.h1``;
const Body = styled.div`
  padding: 16px 24px;
  border-radius: 16px;
  border: 1px solid gray;
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
`;
const Paragraph = styled.p``;
const SubTitle = styled.h4`
  font-weight: bold;
  font-size: 20px;
`;
const Text = styled.span``;

const CheckboxGroup = styled.div`
  margin-top: 24px;
  align-items: center;
  display: flex;
  gap: 16px;
`;

const Label = styled.label``;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 24px;
  height: 24px;
`;

export default Privacy;
