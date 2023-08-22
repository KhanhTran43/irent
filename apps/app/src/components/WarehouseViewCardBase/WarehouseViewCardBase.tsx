import { violet } from '@radix-ui/colors';
import { SewingPinFilledIcon, TimerIcon } from '@radix-ui/react-icons';
import moment from 'moment';
import styled from 'styled-components';

import { WardLabel } from '@/constants/ward-label.constant';
import { WardValue } from '@/enums/ward-value.enum';
import { WareHouseModel } from '@/models/warehouse.model';
import { convertTimestampToDate } from '@/utils/convert-timestamp-to-date.util';
import { formatPrice } from '@/utils/format-price.util';

type WarehouseViewCardProps = {
  warehouse: WareHouseModel;
  showRentedProgression?: boolean;
  showPrice?: boolean;
  onClick?: (id: number) => void;
};

export const WarehouseViewCardBase = ({
  warehouse,
  showRentedProgression = false,
  showPrice = false,
  onClick,
}: WarehouseViewCardProps) => {
  const { id, name, price, area, createdDate, address, rented, ward } = warehouse;

  return (
    <CardContainer onClick={() => onClick?.(id)}>
      <CardImage alt="Product" src="https://picsum.photos/seed/picsum/400/300" />
      <TextContainer>
        <CardName>{name}</CardName>
        <CardAddress>
          <SewingPinFilledIcon />
          {[ward === WardValue.ALL ? undefined : WardLabel[ward], address].filter(Boolean).join(' - ')}
        </CardAddress>
        {showPrice && <PriceText>{formatPrice(price)} VND</PriceText>}
        <CardArea>{area} mét vuông</CardArea>
        {showRentedProgression &&
          (rented === true ? (
            <RentedProgress endDate={warehouse.rentedInfo.endDate} rentedDate={warehouse.rentedInfo.rentedDate} />
          ) : (
            <RentedProgress />
          ))}
        <CardDate>
          <TimerIcon />
          {convertTimestampToDate(createdDate)}
        </CardDate>
      </TextContainer>
    </CardContainer>
  );
};

type RentedProgressProps = {
  rentedDate?: string;
  endDate?: string;
};

const RentedProgress = ({ rentedDate, endDate }: RentedProgressProps) => {
  const daysLeft = endDate ? moment(endDate).diff(moment(), 'days') : 0;
  const daysPassed = rentedDate ? moment().diff(moment(rentedDate), 'days') : 0;

  return (
    <>
      {
        <>
          <Progress max={daysLeft} value={daysPassed} />
          <CardDaysLeft>{`Còn ${daysLeft} ngày`}</CardDaysLeft>
        </>
      }
    </>
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

const TextContainer = styled.div`
  padding: 25px 20px 20px;
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 172px;
`;

const CardAddress = styled.span`
  display: flex;
  align-items: center;
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
  position: absolute;
  top: 0px;
  right: 20px;
  transform: translateY(50%);

  color: #999;
  font-size: 12px;

  display: flex;
  gap: 4px;
`;

const PriceText = styled.div`
  min-width: 60px;
  height: 16px;
  padding: 4px;
  background: #3891e3;
  color: white;
  position: absolute;
  top: -20px;
  border-radius: 4px;
  text-align: center;
`;

const CardDaysLeft = styled.span`
  color: #999;
  font-size: 12px;
`;

const Progress = styled.progress`
  accent-color: ${violet.violet9};
`;
