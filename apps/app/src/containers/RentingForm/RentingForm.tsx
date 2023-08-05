import { useState } from 'react';
import styled from 'styled-components';

import Button from '../../components/Button/Button';
import Privacy from '../../components/Privacy/Privacy';
import RenterInformation from '../../components/RenterInformation/RenterInformation';
import RentingConfirmation from '../../components/RentingConfirmation/RentingConfirmation';
import RentingWarehouseDetails from '../../components/RentingWarehouseDetails/RentingWarehouseDetails';
import { StepperItemModel } from '../../components/Stepper';
import Stepper from '../../components/Stepper/Stepper';
import { WardValue } from '../../enums/ward-value.enum';
import { UserModel } from '../../models/user.model';
import { WarehouseDetailsModel } from '../../models/warehouse-details.model';

const RentingForm = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [stepperItems, setStepperItems] = useState<StepperItemModel[]>([
    {
      label: 'Nhập thông tin',
      status: 'active',
    },
    {
      label: 'Điều khoản',
      status: 'default',
    },
    {
      label: 'Xác nhận',
      status: 'default',
    },
  ]);
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

  const nextPage = () => {
    let currentActiveIdx: number | null;

    setStepperItems(
      stepperItems.map((it, idx) => {
        if (it.status === 'active') {
          it.status = 'finish';
          currentActiveIdx = idx + 1;
        } else if (currentActiveIdx ?? idx === currentActiveIdx) {
          it.status = 'active';
          currentActiveIdx = null;
          setActiveIdx(idx);
        }

        return it;
      }),
    );
  };

  const backPage = () => {
    let currentActiveIdx: number | null;

    setStepperItems(
      stepperItems.reduceRight((prev, curr, idx) => {
        if (curr.status === 'active') {
          curr.status = 'default';
          currentActiveIdx = idx;
        } else if (currentActiveIdx ?? idx === currentActiveIdx! - 1) {
          curr.status = 'active';
          currentActiveIdx = null;
          setActiveIdx(idx);
        }

        prev.unshift(curr);

        return prev;
      }, [] as StepperItemModel[]),
    );
  };

  return (
    <Container>
      <Header>
        <TextContainer>
          <Title>Thuê kho bãi</Title>
          <Detail>Vui lòng điền đầy đủ thông tin bên dưới</Detail>
        </TextContainer>
        <ButtonContainer>
          <Button disabled={!activeIdx} type="secondary" onClick={() => backPage()}>
            Quay lại
          </Button>
          <Button onClick={() => nextPage()}>Tiếp theo</Button>
        </ButtonContainer>
      </Header>
      <Stepper items={stepperItems} />
      {activeIdx === 0 && <RenterInformation price={warehouse.price} setRenterInfo={setRenterInfo} />}
      {activeIdx === 1 && <Privacy />}
      {activeIdx === 2 && <RentingConfirmation warehouse={warehouse} />}
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
