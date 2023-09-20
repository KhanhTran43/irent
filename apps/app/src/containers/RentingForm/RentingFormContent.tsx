import { Elements } from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions } from '@stripe/stripe-js';
import { useFormikContext } from 'formik';
import { isEmpty, mapValues } from 'lodash';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { api } from '@/axios/axios';
import { Dialog } from '@/components/Common/Dialog';
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
import { CreateRentedWarehouseModel } from '@/models/rented-warehouse.model';
import { useRentingWarehouseResolver } from '@/resolver/WarehouseResolver';
import { calculateRentingWarehousePrices } from '@/utils/calculate-renting-warehouse-prices';
import { convertDateToLocaleDateFormat } from '@/utils/datetime-format.util';
import { formatPrice } from '@/utils/format-price.util';
import { getAllRentingInfoDates, getCurrentDate, getEndDate, getStartDate } from '@/utils/rented-warehouse.util';

import { CustomerCheckoutForm } from './CustomerCheckoutForm';

export type RentingState = {
  price: number;
  totalPrice: number;
  deposit: number;
  remain: number;
  startDate: Date;
  endDate: Date;
  rentedDate: Date;
  duration: number;
};

export function RentingFormContent() {
  const { user } = useAuthStore();
  const { warehouse, owner, renter } = useRentingWarehouseResolver();

  const { values, validateForm, errors } = useFormikContext<RenterInformationFormValuesType>();

  const [isStepperCanNext, setStepperCanNext] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const calculateRentingState = useCallback(() => {
    const price = warehouse.price;
    const duration = values.duration;
    const startDate = values.startDate;
    const prices = calculateRentingWarehousePrices(price, duration);
    const dates = mapValues(getAllRentingInfoDates(startDate, duration), (date) => date.toDate());

    return { ...prices, ...dates, price, duration };
  }, [values, warehouse.price]);

  const [rentingState, setRentingState] = useState<RentingState>(() => {
    return calculateRentingState();
  });

  useEffect(() => {
    setRentingState(calculateRentingState());
  }, [calculateRentingState]);

  const dialogContentRef = useRef<ReactNode>(null);
  const contractRef = useRef<string>('');

  const rentingConfirmationElement = useMemo(
    () => <RentingConfirmation rentingState={rentingState} warehouse={warehouse} />,
    [warehouse, rentingState],
  );
  const contractConfirmationElement = useMemo(() => {
    const { duration, endDate, rentedDate, startDate } = rentingState;
    return (
      renter &&
      owner && (
        <ContractConfirmation
          contractOptions={{
            duration,
            endDate,
            rentedDate,
            startDate,
            owner,
            renter,
            warehouse,
          }}
          getContract={(contract) => {
            contractRef.current = contract;
          }}
          onAgreedChange={setStepperCanNext}
        />
      )
    );
  }, [rentingState, owner, renter, warehouse]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isEmpty(errors)) {
      setStepperCanNext(true);
    } else setStepperCanNext(false);
  }, [errors]);

  const stripeAppearance: Appearance = {
    theme: 'stripe',
    variables: {
      fontFamily: 'GeneralSans-Variable, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      fontWeightNormal: '500',
    },
  };

  const stepperItems: StepperItemType[] = useMemo(
    () => [
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
    ],
    [contractConfirmationElement, rentingConfirmationElement],
  );

  const handleSaveRentedWarehouse = () => {
    if (user) {
      const { duration, startDate } = values;

      const rentedWarehouse: CreateRentedWarehouseModel = {
        renterId: user.id,
        warehouseId: warehouse.id,
        rentedDate: getCurrentDate().format(),
        endDate: getEndDate(startDate, duration).format(),
        contractBase64: contractRef.current,
        startDate: getStartDate(startDate).format(),
      };

      console.log(rentedWarehouse);

      // api.post(`rentedWarehouse`, rentedWarehouse).then(() => {
      //   navigate('/home');
      // });
    }
  };

  const handleOnPayment = (price: number) => {
    const amount = price * values.duration;
    api
      .post<{ clientSecret: string }>('/payment/fee', { amount, ownerId: owner?.id, userId: user?.id })
      .then((response) => {
        const clientSecret = response.data.clientSecret;
        const options: StripeElementsOptions = {
          clientSecret,
          appearance: stripeAppearance,
        };

        const { deposit, remain, startDate } = rentingState;

        dialogContentRef.current = (
          <Elements options={options} stripe={stripePromise}>
            <WarningWrapper>
              <Title>Xác nhận thanh toán</Title>
              <span>
                <p>
                  Sau khi xác nhận thanh toán, bạn sẽ trả phần tiền cọc là <strong>{formatPrice(deposit)}</strong> VND.
                </p>
                <p>
                  Sau đó bạn cần phải thanh toán phần còn lại sau tiền cọc là <strong>{formatPrice(remain)}</strong> VND
                  trước hoặc trong ngày <strong>{convertDateToLocaleDateFormat(startDate)}</strong> để hoàn thành việc
                  thuê kho bãi.
                </p>
                <p>
                  Lưu ý, nếu như không thanh toán đúng hạn, yêu cầu thuê kho cả bạn sẽ bị hủy và không hoàn lại số tiền
                  đã cọc
                </p>
              </span>
            </WarningWrapper>

            <CustomerCheckoutForm clientSecret={clientSecret} total={amount} onSucceed={handleSaveRentedWarehouse} />
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
        onCanNextChange={setStepperCanNext}
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
            <Title>Thuê {warehouse.name}</Title>
            <StepperProgression />
            {/* <Detail>Vui lòng điền đầy đủ thông tin bên dưới</Detail> */}
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

const Title = styled.h2`
  margin-bottom: 20px;
`;

const WarningWrapper = styled.div`
  width: 400px;
`;

const PaymentDialog = styled(Dialog)`
  background-color: white;
`;
