import styled from 'styled-components';
import { MyWarehouseDetailsModel } from '../../models/my-warehouse-details.model';
import { SewingPinFilledIcon, TimerIcon } from '@radix-ui/react-icons';
import { convertTimestampToDate } from '../../utils/convert-timestamp-to-date.util';
import { violet, mauve, blackA } from '@radix-ui/colors';

interface MyWarehouseViewCardProps {
  warehouse: MyWarehouseDetailsModel;
  onClick: (id: number) => void;
}

const MyWarehouseViewCard = (props: MyWarehouseViewCardProps) => {
  const { id, name, ward, area, endDate, createdDate, daysLeft } =
    props.warehouse;

  return (
    <CardContainer>
      <CardImage
        src="https://picsum.photos/seed/picsum/400/300"
        alt="Product"
      />
      <TextContainer>
        <CardName>{name}</CardName>
        <CardAddress>
          <SewingPinFilledIcon />
          {ward}
        </CardAddress>
        <CardDate>
          <TimerIcon />
          {convertTimestampToDate(createdDate)}
        </CardDate>
        <Progress max={endDate} value={createdDate} />
        <CardDaysLeft>
          {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
        </CardDaysLeft>
      </TextContainer>
    </CardContainer>
  );
};

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

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const TextContainer = styled.div`
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
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

const CardDate = styled.span`
  color: #999;
  font-size: 12px;
  position: absolute;
  right: 12px;
  display: flex;
  gap: 4px;
`;

const CardDaysLeft = styled.span`
  color: #999;
  font-size: 12px;
`;

const Progress = styled.progress`
  accent-color: ${violet.violet9};
`;

export default MyWarehouseViewCard;
