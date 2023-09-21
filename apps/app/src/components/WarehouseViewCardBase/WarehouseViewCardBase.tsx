import { blueA, green } from '@radix-ui/colors';
import { SewingPinFilledIcon, TimerIcon } from '@radix-ui/react-icons';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

import { WareHouseModel } from '@/models/warehouse.model';
import { convertTimestampToDate } from '@/utils/convert-timestamp-to-date.util';
import { formatPrice } from '@/utils/format-price.util';
import { resolveAddress } from '@/utils/warehouse-address.util';

import { Label } from '../Common/Label';
import { RentedWarehouseProgress } from './RentedWarehouseProgress';

export type WarehouseViewCardProps = {
  warehouse: WareHouseModel;
  showRentedProgression?: boolean;
  showPrice?: boolean;
  showStatus?: boolean;
  onClick?: (id: number) => void;
};

export const WarehouseViewCardBase = ({
  warehouse,
  showRentedProgression = false,
  showPrice = false,
  showStatus = false,
  onClick,
}: WarehouseViewCardProps) => {
  const { id, name, price, area, createdDate, images, rentedInfo } = warehouse;
  const address = resolveAddress(warehouse.address);

  return (
    <CardContainer onClick={() => onClick?.(id)}>
      <CardImage
        alt="Product"
        src={isEmpty(images) ? 'https://picsum.photos/seed/picsum/400/300' : images![0].originalUrl}
      />
      <TextContainer>
        <CardName>{name}</CardName>
        <CardAddress>
          <CardAddressIcon>
            <SewingPinFilledIcon />
          </CardAddressIcon>
          <AddressText title={address}>{address}</AddressText>
        </CardAddress>
        {showPrice && <PriceText color="#008cff">{formatPrice(price)} VND</PriceText>}
        {showStatus && rentedInfo && <Status color={green.green9}>{rentedInfo.status}</Status>}
        <CardArea>{area} mét vuông</CardArea>
        {showRentedProgression && <RentedWarehouseProgress rentedInfo={warehouse.rentedInfo}></RentedWarehouseProgress>}
        <CardDate>
          <TimerIcon />
          {convertTimestampToDate(createdDate)}
        </CardDate>
      </TextContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 283px;
  background-color: #ffffff;
  border: 1px solid ${blueA.blueA9};
  border-radius: 8px;
  padding-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: center;
  position: relative;
  margin: 0 auto;
  transition: box-shadow 0.5s ease;

  &:hover {
    box-shadow: 0 2px 4px ${blueA.blueA6};
    cursor: pointer;
  }
`;

const TextContainer = styled.div`
  --container-padding-top: 30px;
  padding: var(--container-padding-top) 20px 20px;
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
  height: 25px;
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 172px;
`;

const CardAddress = styled.span`
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  color: #505050;
`;

const AddressText = styled.p`
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
`;

const CardAddressIcon = styled.div`
  display: flex;
`;

const CardImage = styled.img`
  width: 283px;
  height: 179px;
  object-fit: contain;
  object-position: center;
  border-radius: 4px;
`;

const CardDate = styled.span`
  position: absolute;
  top: var(--container-padding-top);
  right: 20px;
  transform: translateY(-100%);

  color: #999;
  font-size: 12px;

  display: flex;
  gap: 4px;
`;

const PriceText = styled(Label)`
  position: absolute;
  top: -20px;
`;

const Status = styled(Label)`
  position: absolute;
  top: -12px;
  right: 20px;
`;
