import styled from 'styled-components';

import { RenterInformationProvider } from '../../components/RenterInformation';
import { RentingFormContent } from './RentingFormContent';

export const RentingForm = () => {
  return (
    <Container>
      <RenterInformationProvider>
        <RentingFormContent></RentingFormContent>
      </RenterInformationProvider>
    </Container>
  );
};

const Container = styled.div``;
