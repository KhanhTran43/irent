import { violet } from '@radix-ui/colors';
import { SewingPinFilledIcon, TimerIcon } from '@radix-ui/react-icons';
import moment from 'moment';
import styled from 'styled-components';

import { MyWarehouseDetailsModel } from '../../models/my-warehouse-details.model';

type MyWarehouseViewCardProps = {
  warehouse: MyWarehouseDetailsModel;
  onClick: (id: number) => void;
};

const MyWarehouseViewCard = ({ warehouse, onClick }: MyWarehouseViewCardProps) => {
  const { id, name, address, area, endDate, createdDate } = warehouse;
  const daysLeft = warehouse.daysLeft ?? moment(createdDate).diff(moment(endDate), 'days');

  return (
    <CardContainer onClick={() => onClick(id)}>
      <CardImage alt="Product" src="https://picsum.photos/seed/picsum/400/300" />
      <TextContainer>
        <CardName>{name}</CardName>
        <CardAddress>
          <SewingPinFilledIcon />
          {address}
        </CardAddress>
        <CardDate>
          <TimerIcon />
          {moment(createdDate).format('DD/MM/yyyy hh:mm')}
        </CardDate>
        <Progress max={endDate} value={createdDate} />
        <CardDaysLeft>{`${daysLeft} day${daysLeft <= 1 ? '' : 's'} left`}</CardDaysLeft>
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
  position: absolute;
  top: -5px;
  right: 20px;
  transform: translateY(50%);

  color: #999;
  font-size: 12px;

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
