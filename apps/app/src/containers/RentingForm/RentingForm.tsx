import { useMemo, useState } from 'react';
import styled from 'styled-components';

import {
  Stepper,
  StepperBackButton,
  StepperContentRenderer,
  StepperItemModel,
  StepperNextButton,
  StepperProgression,
} from '@/components/Common/Stepper';

import Privacy from '../../components/Privacy/Privacy';
import { RenterInformationForm, RenterInformationProvider } from '../../components/RenterInformation';
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
        content: <Privacy />,
      },
      {
        label: 'Xác nhận',
        status: 'default',
        content: <RentingConfirmation warehouse={warehouse} />,
      },
    ],
    [warehouse],
  );

  const {
    warehouse: { rented },
  } = useWarehouseResolver();

  return (
    <Container>
      {rented ? (
        <div>Invalid Action</div>
      ) : (
        <RenterInformationProvider>
          <Stepper items={stepperItems}>
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
