import { FormikProps } from 'formik';
import moment from 'moment';
import { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { api } from '../../axios/axios';
import {
  CreateWarehouseForm,
  CreateWarehouseFormValuesType,
  CreateWarehouseProvider,
} from '../../components/CreateWarehouseForm';
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
  const [stepperCanNext, setStepperCanNext] = useState<boolean>();
  const currentStepRef = useRef<number>();
  const createWarehouseFormRef = useRef<FormikProps<CreateWarehouseFormValuesType>>(null);

  const stepperItems = useMemo<StepperItemModel[]>(
    () => [
      {
        label: 'Nhập thông tin',
        status: 'active',
        content: <CreateWarehouseForm />,
      },
      {
        label: 'Điều khoản',
        status: 'default',
        content: <Privacy onAgreedChange={(value) => setStepperCanNext(value)} />,
      },
    ],
    [],
  );

  const handleNextButtonClick = (curr: number | undefined) => {};

  return (
    <Container>
      <CreateWarehouseProvider
        innerRef={createWarehouseFormRef}
        onFormValidChange={(payload) => {
          if (currentStepRef.current !== 0) return;
          if (payload.isValid) setStepperCanNext(true);
          else setStepperCanNext(false);
        }}
      >
        <Stepper
          isCanNext={stepperCanNext}
          items={stepperItems}
          onComplete={() => {
            const { current: formikProps } = createWarehouseFormRef;

            const userId = 8; // TODO: get userId from persisted user data
            api.post(`warehouse/`, { ...formikProps?.values, createdDate: moment().format(), userId });
          }}
          onStepChange={(s) => {
            currentStepRef.current = s;

            if (s === 1) {
              setStepperCanNext(false);
            }
          }}
        >
          <Header>
            <TextContainer>
              <Title>Tạo kho bãi</Title>
              <Detail>Vui lòng điền đầy đủ thông tin bên dưới</Detail>
            </TextContainer>
            <StepperProgression />
            <ButtonContainer>
              <StepperBackButton color="secondary"></StepperBackButton>
              <StepperNextButton onClick={handleNextButtonClick}></StepperNextButton>
            </ButtonContainer>
          </Header>
          <StepperContentRenderer />
        </Stepper>
      </CreateWarehouseProvider>
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
