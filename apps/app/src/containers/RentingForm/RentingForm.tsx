import { FormikProps } from 'formik';
import { isEmpty } from 'lodash';
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { api } from '@/axios/axios';
import { Button } from '@/components/Common/Button';
import {
  Stepper,
  StepperBackButton,
  StepperContentRenderer,
  StepperItemModel,
  StepperNextButton,
  StepperProgression,
} from '@/components/Common/Stepper';
import { Invalid } from '@/components/Fallback';
import { RentedWarehouseModel } from '@/models/rented-warehouse.model';
import { getEndDate, getStartDate } from '@/utils/rentedWarehouse.util';

import Privacy from '../../components/Privacy/Privacy';
import {
  RenterInformationForm,
  RenterInformationFormValuesType,
  RenterInformationProvider,
} from '../../components/RenterInformation';
import RentingConfirmation from '../../components/RentingConfirmation/RentingConfirmation';
import { WardValue } from '../../enums/ward-value.enum';
import { UserModel } from '../../models/user.model';
import { WareHouseModel } from '../../models/warehouse.model';
import { useWarehouseResolver } from '../../resolver/WarehouseResolver';

const RentingForm = () => {
  const [warehouse] = useState<WareHouseModel>({
    id: 1,
    userId: 1,
    name: 'Kho bãi rộng rãi thoáng mát sạch sẽ',
    ward: WardValue.CAM_LE,
    price: 400,
    area: 45,
    createdDate: Date.now(),
    doorQuantity: 3,
    floors: 4,
  });

  const [renterInfo, setRenterInfo] = useState<UserModel>({
    id: 1,
    name: 'Haha',
    phoneNumber: '+84 002992922',
    email: '@gmail.com',
    ioc: '12313',
  });
  const [isStepperCanNext, setStepperCanNext] = useState(false);
  const renterInformationProviderRef = useRef<FormikProps<RenterInformationFormValuesType>>(null);
  const { user } = useAuthStore();
  const {
    warehouse: { rented, id: warehouseId },
  } = useWarehouseResolver();
  const navigate = useNavigate();

  const stepperItems = useMemo<StepperItemModel[]>(
    () => [
      {
        label: 'Nhập thông tin',
        status: 'active',
        content: <RenterInformationForm setRenterInfo={setRenterInfo} />,
      },
      {
        label: 'Điều khoản',
        status: 'default',
        content: <Privacy onAgreedChange={setStepperCanNext} />,
      },
      {
        label: 'Xác nhận',
        status: 'default',
        content: (
          <>
            <RentingConfirmation warehouse={warehouse} />
            <Button onClick={() => setStepperCanNext(true)}>Mock payment</Button>
          </>
        ),
      },
    ],
    [warehouse],
  );

  return (
    <Container>
      {rented ? (
        <Invalid />
      ) : (
        <RenterInformationProvider
          innerRef={renterInformationProviderRef}
          onFormValidChange={(payload) => {
            console.log('ddd');

            if (payload.isValid) setStepperCanNext(true);
            else setStepperCanNext(false);
          }}
        >
          <Stepper
            defaultCanNextOnNewStep={false}
            isCanNext={isStepperCanNext}
            items={stepperItems}
            onCanNextChange={setStepperCanNext}
            onComplete={() => {
              const { current: formikProps } = renterInformationProviderRef;

              if (user && formikProps) {
                const { duration } = formikProps.values;

                const rentedWarehouse: RentedWarehouseModel = {
                  renterId: user.id,
                  warehouseId,
                  rentedDate: getStartDate(),
                  endDate: getEndDate(duration),
                };

                api.post(`rentedWarehouse`, rentedWarehouse).then(() => {
                  navigate('/home');
                });
              }
            }}
            onStepChange={(step) => {
              if (step === 0) {
                renterInformationProviderRef.current?.validateForm().then((errors) => {
                  setStepperCanNext(isEmpty(errors));
                });
              }
            }}
          >
            <Header>
              <TextContainer>
                <Title>Thuê kho bãi</Title>
                <StepperProgression />
                <Detail>Vui lòng điền đầy đủ thông tin bên dưới</Detail>
              </TextContainer>
              <ButtonContainer>
                <StepperBackButton color="secondary" />
                <StepperNextButton />
              </ButtonContainer>
            </Header>
            <StepperContentRenderer />
          </Stepper>
        </RenterInformationProvider>
      )}
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

export default RentingForm;
