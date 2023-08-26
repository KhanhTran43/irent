import { Elements } from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions } from '@stripe/stripe-js';
import { FormikProps } from 'formik';
import { isEmpty } from 'lodash';
import { ReactNode, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { api } from '@/axios/axios';
import { Button } from '@/components/Common/Button';
import { Dialog } from '@/components/Common/Dialog';
import {
  Stepper,
  StepperBackButton,
  StepperContentRenderer,
  StepperItemModel,
  StepperNextButton,
  StepperProgression,
} from '@/components/Common/Stepper';
import { ContractConfirmation } from '@/components/ContractConfirmation';
import { Invalid } from '@/components/Fallback';
import { RentingConfirmation } from '@/components/RentingConfirmation';
import { stripePromise } from '@/libs';
import { RentedWarehouseModel } from '@/models/rented-warehouse.model';
import { getEndDate, getStartDate } from '@/utils/rented-warehouse.util';

import {
  RenterInformationForm,
  RenterInformationFormValuesType,
  RenterInformationProvider,
} from '../../components/RenterInformation';
import { WardValue } from '../../enums/ward-value.enum';
import { UserModel } from '../../models/user.model';
import { WareHouseModel } from '../../models/warehouse.model';
import { useWarehouseResolver } from '../../resolver/WarehouseResolver';
import { CheckoutForm } from './CheckoutForm';

export const RentingForm = () => {
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
    rented: false,
    image: '',
  });

  const [renterInfo, setRenterInfo] = useState<UserModel>({
    id: 1,
    name: 'Haha',
    phoneNumber: '+84 002992922',
    email: '@gmail.com',
    ioc: '12313',
    role: 1,
  });

  // store
  const { user } = useAuthStore();
  const {
    warehouse: { rented, id: warehouseId, price },
  } = useWarehouseResolver();

  // router
  const navigate = useNavigate();

  // stepper
  const [isStepperCanNext, setStepperCanNext] = useState(false);
  const renterInformationProviderRef = useRef<FormikProps<RenterInformationFormValuesType>>(null);

  // stripe
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const dialogContentRef = useRef<ReactNode>(null);
  const stripeAppearance: Appearance = {
    theme: 'stripe',
    variables: {
      fontFamily: 'GeneralSans-Variable, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      fontWeightNormal: '500',
    },
  };

  // contract
  const contractRef = useRef<string>('');

  const handleSaveRentedWarehouse = () => {
    const { current: formikProps } = renterInformationProviderRef;

    if (user && formikProps) {
      const { duration } = formikProps.values;

      const rentedWarehouse: RentedWarehouseModel = {
        renterId: user.id,
        warehouseId,
        rentedDate: getStartDate(),
        endDate: getEndDate(duration),
        contractBase64: contractRef.current,
      };

      api.post(`rentedWarehouse`, rentedWarehouse).then(() => {
        navigate('/home');
      });
    }
  };

  const handleOnPayment = (price: number) => {
    const { current: formikProps } = renterInformationProviderRef;

    if (formikProps) {
      const amount = price * formikProps.values.duration;
      api.post<{ clientSecret: string }>('/payment', { amount }).then((response) => {
        const options: StripeElementsOptions = {
          clientSecret: response.data.clientSecret,
          appearance: stripeAppearance,
        };

        dialogContentRef.current = (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm total={amount} onSucceed={handleSaveRentedWarehouse} />
          </Elements>
        );

        setPaymentDialogOpen(true);
      });
    }
  };

  const stepperItems = useMemo<StepperItemModel[]>(
    () => [
      {
        label: 'Nhập thông tin',
        status: 'active',
        content: <RenterInformationForm setRenterInfo={setRenterInfo} />,
      },
      {
        label: 'Xem hợp đồng',
        status: 'default',
        content: (
          <ContractConfirmation
            getContract={(contract) => {
              contractRef.current = contract;
            }}
            onAgreedChange={setStepperCanNext}
          />
        ),
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
            if (payload.isValid) setStepperCanNext(true);
            else setStepperCanNext(false);
          }}
        >
          <Stepper
            defaultCanNextOnNewStep={false}
            isCanNext={isStepperCanNext}
            items={stepperItems}
            onCanNextChange={setStepperCanNext}
            onComplete={() => handleOnPayment(price)}
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
          <PaymentDialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
            {dialogContentRef.current}
          </PaymentDialog>
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

const PaymentDialog = styled(Dialog)`
  background-color: white;
`;
