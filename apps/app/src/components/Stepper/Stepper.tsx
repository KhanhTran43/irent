import styled from 'styled-components';

import { StepperItemModel } from './models/stepper-item.model';
import StepperItem from './StepperItem';

type StepperProps = {
  items: StepperItemModel[];
}

const Stepper = (props: StepperProps) => {
  const { items } = props;

  return (
    <Container>
      {items.map((it) => (
        <StepperItem key={it.label} {...it} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

export default Stepper;
