import { useNavigate, useParams } from 'react-router-dom';
import { WareHouseModel } from '../../models/warehouse.model';
import { useState } from 'react';
import styled from 'styled-components';
import { convertTimestampToDate } from '../../utils/convert-timestamp-to-date.util';
import {
  HeartIcon,
  RulerSquareIcon,
  StackIcon,
  ViewVerticalIcon,
} from '@radix-ui/react-icons';
import { WarehouseDetailsModel } from '../../models/warehouse-details.model';

import { WardValue } from '../../enums/ward-value.enum';
import Button from '../../components/Button/Button';

const mockWarehouseDetails: WarehouseDetailsModel = {
  id: 1,
  name: 'Thien Thai Ho',
  ward: WardValue.HAI_CHAU,
  price: 45,
  area: 100,
  createdDate: 1,
  doorQuantity: 3,
  floors: 3,
};

const WarehouseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: get warehouse details
  const [warehouseDetails, setWarehouseDetails] =
    useState(mockWarehouseDetails);

  const goToRentingForm = () => {
    navigate(`/warehouse/${id}/renting`);
  }

  return (
    <Container>
      <ImageContainer>
        <Image src="https://picsum.photos/seed/picsum/900/300" alt="title" />
      </ImageContainer>
      <HeaderContainer>
        <Title>{warehouseDetails.name}</Title>
        <Address>
          {warehouseDetails.ward}. <DirectionText>See on map</DirectionText>
        </Address>
        <Date>
          Created at: {convertTimestampToDate(warehouseDetails.createdDate)}
        </Date>
        <br />
        <ButtonContainer>
          <Button onClick={goToRentingForm}>Rent</Button>
        </ButtonContainer>
        <IconActions>
          <IconActionItem>
            <HeartIcon></HeartIcon>
            <Text>Shortlist</Text>
          </IconActionItem>
        </IconActions>

        <MetricsContainer>
          <Price>{warehouseDetails.price} $ / mth</Price>
          <OtherMetrics>
            <OtherMetricItem>
              <RulerSquareIcon
                width={32}
                height={32}
                color="#999"
              ></RulerSquareIcon>
              <Text>{warehouseDetails.area} sqrt</Text>
            </OtherMetricItem>
            <OtherMetricItem>
              <ViewVerticalIcon
                width={32}
                height={32}
                color="#999"
              ></ViewVerticalIcon>
              <Text>{warehouseDetails.doorQuantity} doors</Text>
            </OtherMetricItem>
            <OtherMetricItem>
              <StackIcon width={32} height={32} color="#999"></StackIcon>
              <Text>{warehouseDetails.floors} floors</Text>
            </OtherMetricItem>
          </OtherMetrics>
        </MetricsContainer>
      </HeaderContainer>
    </Container>
  );
};

const ImageContainer = styled.div``;

const Image = styled.img`
  border-radius: 16px;
  width: 100%;
`;

const HeaderContainer = styled.div`
  position: relative;
`;

const Title = styled.h1``;

const Address = styled.h4``;

const Date = styled.span`
  color: #999;
`;

const DirectionText = styled.span`
  color: #e03c31;
  pointer-events: none;
`;

const IconActions = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const IconActionItem = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  cursor: pointer;

  &:hover {
    color: #999;
  }
`;

const MetricsContainer = styled.div`
  display: flex;
  margin-top: 24px;
  padding: 24px;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  font-size: 32px;
  font-weight: bold;
`;

const OtherMetrics = styled.div`
  display: flex;
  gap: 24px;
`;

const OtherMetricItem = styled.div`
  text-align: center;
  span {
    margin-top: 8px;
    display: block;
    font-size: 24px;
  }
`;

const Text = styled.span``;

const Container = styled.div``;

const ButtonContainer = styled.div`
  margin-top: 24px;
  text-align: right;
  cursor: pointer;
`;



export default WarehouseDetails;
