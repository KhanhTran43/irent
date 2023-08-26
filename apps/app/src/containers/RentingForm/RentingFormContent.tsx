import { Dialog } from '@radix-ui/react-dialog';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions } from '@stripe/stripe-js';
import { useFormikContext } from 'formik';
import { isEmpty } from 'lodash';
import { ReactNode, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { api } from '@/axios/axios';
import {
  Stepper,
  StepperBackButton,
  StepperContentRenderer,
  StepperItemType,
  StepperNextButton,
  StepperProgression,
} from '@/components/Common/Stepper';
import { ContractConfirmation } from '@/components/ContractConfirmation';
import { RenterInformationFormValuesType, RentingInformationForm } from '@/components/RenterInformation';
import { RentingConfirmation } from '@/components/RentingConfirmation';
import { stripePromise } from '@/libs';
import { RentedWarehouseModel } from '@/models/rented-warehouse.model';
import { useRentingWarehouseResolver } from '@/resolver/WarehouseResolver';
import { getEndDate, getStartDate } from '@/utils/rented-warehouse.util';

import { CheckoutForm } from './CheckoutForm';

export function RentingFormContent() {
  const { user } = useAuthStore();
  const { warehouse, owner, renter } = useRentingWarehouseResolver();

  const { values, validateForm } = useFormikContext<RenterInformationFormValuesType>();

  const [isStepperCanNext, setStepperCanNext] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const dialogContentRef = useRef<ReactNode>(null);
  const contractRef = useRef<string>('');

  const rentingConfirmationElement = useMemo(() => <RentingConfirmation warehouse={warehouse} />, [warehouse]);
  const contractConfirmationElement = useMemo(
    () =>
      renter &&
      owner && (
        <ContractConfirmation
          contractOptions={{
            duration: values.duration,
            endDate: getEndDate(values.duration),
            rentedDate: getStartDate(),
            owner: renter,
            renter: owner,
            warehouse: warehouse,
          }}
          getContract={(contract) => {
            contractRef.current = contract;
          }}
          onAgreedChange={setStepperCanNext}
        />
      ),
    [values.duration, warehouse, owner, renter],
  );

  const navigate = useNavigate();

  const stripeAppearance: Appearance = {
    theme: 'stripe',
    variables: {
      fontFamily: 'GeneralSans-Variable, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      fontWeightNormal: '500',
    },
  };

  const stepperItems: StepperItemType[] = [
    {
      label: 'Nhập thông tin',
      status: 'active',
      content: <RentingInformationForm />,
    },
    {
      label: 'Xem hợp đồng',
      status: 'default',
      content: contractConfirmationElement,
    },
    {
      label: 'Xác nhận',
      status: 'default',
      content: rentingConfirmationElement,
    },
  ];

  const handleSaveRentedWarehouse = () => {
    if (user) {
      const { duration } = values;

      const rentedWarehouse: RentedWarehouseModel = {
        renterId: user.id,
        warehouseId: warehouse.id,
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
    const amount = price * values.duration;
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
  };

  return (
    <>
      <Stepper
        defaultCanNextOnNewStep={false}
        isCanNext={isStepperCanNext}
        items={stepperItems}
        // onCanNextChange={setStepperCanNext}
        onComplete={() => handleOnPayment(warehouse.price)}
        onStepChange={(step) => {
          if (step === 0) {
            validateForm().then((errors) => {
              setStepperCanNext(isEmpty(errors));
            });
          } else if (step === 2) {
            setStepperCanNext(true);
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
    </>
  );
}

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
