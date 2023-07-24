import styled from 'styled-components';
import { StepperItemModel } from './models/stepper-item.model';

const StepperItem = (item: StepperItemModel) => {
  return (
    <Container>
      <Text>{item.status}</Text>
      <Text>{item.label}</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.span`
  display: block;
`;

export default StepperItem;
