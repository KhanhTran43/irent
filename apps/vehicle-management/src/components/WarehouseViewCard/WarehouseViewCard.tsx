import styled from 'styled-components';
import { WareHouseModel } from '../../models/warehouse.model';
import { convertTimestampToDate } from '../../utils/convert-timestamp-to-date.util';

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: center;
  position: relative;
  margin: 0 auto;
  transition: box-shadow 0.5s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
`;

const TextContainer = styled.div`
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CardArea = styled.span`
  font-size: 14px;
  font-weight: normal;
  margin-top: 0px;
`;

const CardName = styled.span`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const CardAddress = styled.span`
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: normal;
  color: #505050;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const CardDate = styled.span`
  color: #999;
  font-size: 12px;
  position: absolute;
  right: 12px;
`

const PriceText = styled.div`
  width: 60px;
  height: 16px;
  padding: 4px;
  background: #3891e3;
  color: white;
  position: absolute;
  top: -20px;
  border-radius: 4px;
  text-align: center;
`;

const WarehouseViewCard = (warehouse: WareHouseModel) => {
  const { id, name, address, price, area, createdDate } = warehouse;

  return (
    <CardContainer>
      <CardImage
        src="https://picsum.photos/seed/picsum/400/300"
        alt="Product"
      />
      <TextContainer>
        <CardName>{name}</CardName>
        <CardAddress>{address}</CardAddress>
        <PriceText>$ {price}</PriceText>
        <CardArea>{area} sqrt</CardArea>
        <CardDate>{convertTimestampToDate(createdDate)}</CardDate>
      </TextContainer>
    </CardContainer>
  );
};

export default WarehouseViewCard;
