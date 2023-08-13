import { useMemo, useState } from 'react';
import styled from 'styled-components';

import Privacy from '../../components/Privacy/Privacy';
import RenterInformation from '../../components/RenterInformation/RenterInformation';
import RentingConfirmation from '../../components/RentingConfirmation/RentingConfirmation';
import {
  StepperBackButton,
  StepperContentRenderer,
  StepperItemModel,
  StepperNextButton,
  StepperProgression,
} from '../../components/Stepper';
import Stepper from '../../components/Stepper/Stepper';
import { WardValue } from '../../enums/ward-value.enum';
import { UserModel } from '../../models/user.model';
import { WarehouseDetailsModel } from '../../models/warehouse-details.model';

const RentingForm = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [warehouse] = useState<WarehouseDetailsModel>({
    id: 1,
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
        content: <RenterInformation price={warehouse.price} setRenterInfo={setRenterInfo} />,
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

  return (
    <Container>
      <Stepper items={stepperItems}>
        <Header>
          <TextContainer>
            <Title>Thuê kho bãi</Title>
            <StepperProgression />
            <Detail>Vui lòng điền đầy đủ thông tin bên dưới</Detail>
          </TextContainer>
          <ButtonContainer>
            <StepperBackButton />
            <StepperNextButton />
          </ButtonContainer>
        </Header>
        <StepperContentRenderer />
        {/* {activeIdx === 0 && <RenterInformation price={warehouse.price} setRenterInfo={setRenterInfo} />}
        {activeIdx === 1 && <Privacy />}
        {activeIdx === 2 && <RentingConfirmation warehouse={warehouse} />} */}
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

export default RentingForm;
