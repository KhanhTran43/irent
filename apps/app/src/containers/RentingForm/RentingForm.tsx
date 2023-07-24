import styled from 'styled-components';
import Button from '../../components/Button/Button';
import { StepperItemModel } from '../../components/Stepper';
import Stepper from '../../components/Stepper/Stepper';
import { useState } from 'react';

const RentingForm = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [stepperItems, setStepperItems] = useState<StepperItemModel[]>([
    {
      label: 'Question 1',
      status: 'active',
    },
    {
      label: 'Question 2',
      status: 'default',
    },
    {
      label: 'Question 3',
      status: 'default',
    },
    {
      label: 'Question 4',
      status: 'default',
    },
    {
      label: 'Question 5',
      status: 'default',
    },
    {
      label: 'Question 6',
      status: 'default',
    },
  ]);

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
      })
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
      }, [] as StepperItemModel[])
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
          <Button
            type="secondary"
            onClick={() => backPage()}
            disabled={!activeIdx}
          >
            Quay lại
          </Button>
          <Button onClick={() => nextPage()}>Tiếp theo</Button>
        </ButtonContainer>
      </Header>
      <Stepper items={stepperItems} />
      {
        activeIdx === 0 && <>Step 1</>
      }
      {
        activeIdx === 1 && <>Step 2</>
      }
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
