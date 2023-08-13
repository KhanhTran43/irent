import { useState } from 'react';
import styled from 'styled-components';

import Button from '../../components/Button/Button';
import CreateWarehouseForm from '../../components/CreateWarehouseForm/CreateWarehouseForm';
import Privacy from '../../components/Privacy/Privacy';
import {
  StepperBackButton,
  StepperContentRenderer,
  StepperItemModel,
  StepperNextButton,
  StepperProgression,
} from '../../components/Stepper';
import Stepper from '../../components/Stepper/Stepper';

const CreateWarehouse = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [stepperItems, setStepperItems] = useState<StepperItemModel[]>([
    {
      label: 'Nhập thông tin',
      status: 'active',
      content: <CreateWarehouseForm />,
    },
    {
      label: 'Điều khoản',
      status: 'default',
      content: <Privacy />,
    },
  ]);

  return (
    <Container>
      <Stepper items={stepperItems}>
        <Header>
          <TextContainer>
            <Title>Tạo kho bãi</Title>
            <Detail>Vui lòng điền đầy đủ thông tin bên dưới</Detail>
          </TextContainer>
          <StepperProgression />
          <ButtonContainer>
            <StepperBackButton color="secondary"></StepperBackButton>
            <StepperNextButton></StepperNextButton>
          </ButtonContainer>
        </Header>
        <StepperContentRenderer />
        {/* {activeIdx === 0 && <CreateWarehouseForm />}
        {activeIdx === 1 && <Privacy />} */}
      </Stepper>
    </Container>
  );
};

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const Title = styled.h1``;

const Detail = styled.span`
  color: #999;
`;

export default CreateWarehouse;
