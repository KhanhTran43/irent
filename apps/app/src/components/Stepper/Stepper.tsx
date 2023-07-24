import styled from 'styled-components';
import { StepperItemModel } from './models/stepper-item.model';
import StepperItem from './StepperItem';

interface StepperProps {
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
  gap: 24px;
`;

export default Stepper;
