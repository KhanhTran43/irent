import { blueA, green } from '@radix-ui/colors';
import { HomeIcon, SquareIcon, TimerIcon } from '@radix-ui/react-icons';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import styled from 'styled-components';

import { WareHouseModel } from '@/models/warehouse.model';
import { convertTimestampToDate } from '@/utils/convert-timestamp-to-date.util';
import { formatPrice } from '@/utils/format-price.util';
import { getDuration } from '@/utils/rented-warehouse.util';
import { resolveAddress } from '@/utils/warehouse-address.util';

import { Separator } from '../Common/Separator';
import { CardOptions, CardOptionsProps } from './CardOptions';
import { RentedWarehouseProgress } from './RentedWarehouseProgress';
import { StatusLabel } from './StatusLabel';

export type WarehouseViewCardProps = {
  warehouse: WareHouseModel;
  showRentedProgression?: boolean;
  showPrice?: boolean;
  showStatus?: boolean;
  showRentedInfo?: boolean;
  className?: string;
  onClick?: (id: number) => void;
} & CardOptionsProps;

export const WarehouseViewCardBase = ({
  warehouse,
  showRentedProgression = false,
  showPrice = false,
  showRentedInfo = false,
  showStatus = false,
  actions,
  className,
  onClick,
}: WarehouseViewCardProps) => {
  const { id, name, price, area, createdDate, images, rentedInfo } = warehouse;
  const address = resolveAddress(warehouse.address);
  const [isOptionsOpen, setOptionsOpen] = useState(false);

  const renderCardOptions = () => {
    if (actions) return <CardOptions actions={actions} handleOpenChange={setOptionsOpen} open={isOptionsOpen} />;
  };

  const handleCardClick = () => {
    setOptionsOpen(true);
    onClick?.(id);
  };

  return (
    <CardContainer className={className} onClick={handleCardClick}>
      {!isEmpty(actions) && renderCardOptions()}
      <CardImage
        alt="Product"
        src={isEmpty(images) ? 'https://picsum.photos/seed/picsum/400/300' : images![0].originalUrl}
      />
      <TextContainer>
        <CardName>{name}</CardName>
        <CardAddress>
          <CardAddressIcon>
            <HomeIcon />
          </CardAddressIcon>
          <AddressText title={address}>{address}</AddressText>
        </CardAddress>
        {showStatus && rentedInfo && <StatusLabel status={rentedInfo.status} />}
        <CardArea>
          <CardAddressIcon>
            <SquareIcon />
          </CardAddressIcon>
          {area} mét vuông
        </CardArea>

        {showRentedInfo && rentedInfo && (
          <>
            <Separator />
            <RentedInfoArea>
              <RentedInfoSide>
                <RentedInfoSection>Tổng giá thuê:</RentedInfoSection>
                <RentedInfoSection>Thời gian thuê:</RentedInfoSection>
                <RentedInfoSection>Giá cọc:</RentedInfoSection>
                <RentedInfoSection>Giá xác nhận thuê:</RentedInfoSection>
              </RentedInfoSide>
              <Separator orientation="vertical" />
              <RentedInfoSide>
                <RentedInfoSection>{formatPrice(rentedInfo.total)} VND</RentedInfoSection>
                <RentedInfoSection>{getDuration(rentedInfo.startDate, rentedInfo.endDate)} tháng</RentedInfoSection>
                <RentedInfoSection>{formatPrice(rentedInfo.deposit)} VND</RentedInfoSection>
                <RentedInfoSection>{formatPrice(rentedInfo.confirm)} VND</RentedInfoSection>
              </RentedInfoSide>
            </RentedInfoArea>
          </>
        )}
        {showRentedProgression && <RentedWarehouseProgress rentedInfo={warehouse.rentedInfo}></RentedWarehouseProgress>}
        {showPrice && <PriceText color="#008cff">{formatPrice(price)} VND / tháng</PriceText>}
        <CardDate>
          <TimerIcon />
          {convertTimestampToDate(createdDate)}
        </CardDate>
      </TextContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 300px;
  background-color: #ffffff;
  border: 1px solid ${blueA.blueA9};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  margin: 0 auto;
  transition: box-shadow 0.5s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 2px 4px ${blueA.blueA6};
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
  display: flex;
  align-items: center;
`;

const RentedInfoArea = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
`;

const RentedInfoSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RentedInfoSection = styled.div``;

const CardName = styled.span`
  height: 25px;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 172px;
  margin: 12px 0 0;
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
  margin-right: 8px;
`;

const CardImage = styled.img`
  width: 300px;
  height: 180px;
  padding: 4px;
  border-radius: 8px 8px 0 0px;
  object-fit: cover;
  object-position: center;
  box-sizing: border-box;
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

const PriceText = styled.span`
  margin-top: 24px;
  font-weight: bold;
  font-size: 20px;
  text-align: right;
`;
