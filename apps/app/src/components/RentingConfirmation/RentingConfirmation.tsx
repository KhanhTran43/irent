import { useFormikContext } from 'formik';
import styled from 'styled-components';

import { WardLabel } from '@/constants/ward-label.constant';
import { WardValue } from '@/enums/ward-value.enum';
import { WareHouseModel } from '@/models/warehouse.model';

import { formatPrice } from '../../utils/format-price.util';
import { RenterInformationFormValuesType } from '../RenterInformation';

type RentingConfirmationProps = {
  warehouse: WareHouseModel;
  info?: any; // replace later
};

export const RentingConfirmation = (props: RentingConfirmationProps) => {
  const { warehouse, info } = props;
  const {
    values: { duration },
  } = useFormikContext<RenterInformationFormValuesType>();

  return (
    <Container>
      <Title>Xác nhận thông tin</Title>
      <Body>
        <WarehouseContainer>
          <WarehouseContainerInfo>
            <Subtitle>Thông tin kho bãi</Subtitle>
            <ProductName>{warehouse.name}</ProductName>
            <Address>Quận: {warehouse.ward === WardValue.ALL ? '' : WardLabel[warehouse.ward]}</Address>
            <WarehouseBody>
              <div>
                <WarehouseBodyLabel>Diện tích</WarehouseBodyLabel>
                <WarehouseBodyLabel>Số lượng cửa</WarehouseBodyLabel>
                <WarehouseBodyLabel>Số tầng</WarehouseBodyLabel>
                <WarehouseBodyLabel>Giá</WarehouseBodyLabel>
              </div>
              <div>
                <WarehouseBodyData>{warehouse.area} mét vuông</WarehouseBodyData>
                <WarehouseBodyData>{warehouse.doors ?? 0} cửa</WarehouseBodyData>
                <WarehouseBodyData>{warehouse.floors ?? 0} tầng</WarehouseBodyData>
                <WarehouseBodyData>
                  {formatPrice(warehouse.price)} VND / th x {duration} = {formatPrice(warehouse.price * duration)} VND
                </WarehouseBodyData>
              </div>
            </WarehouseBody>
          </WarehouseContainerInfo>
          <WarehouseContainerImage
            alt="Product"
            src="https://picsum.photos/seed/picsum/400/300"
          ></WarehouseContainerImage>
        </WarehouseContainer>
        <RenterInfoContainer>
          <RenterInfoContainerLeft>
            <Subtitle>Địa chỉ thanh toán</Subtitle>
          </RenterInfoContainerLeft>
          <RenterInfoContainerRight>
            <Subtitle>Phương thức thanh toán</Subtitle>
          </RenterInfoContainerRight>
        </RenterInfoContainer>
      </Body>
    </Container>
  );
};

const Container = styled.div``;
const Title = styled.h1``;
const Body = styled.div``;
const WarehouseContainer = styled.div`
  border-radius: 32px;
  padding: 32px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: space-between;
`;
const WarehouseContainerInfo = styled.div``;
const WarehouseContainerImage = styled.img`
  border-radius: 16px;
`;
const Subtitle = styled.h4`
  color: gray;
`;
const ProductName = styled.h3``;
const Address = styled.h4``;
const WarehouseBody = styled.div`
  display: flex;
  gap: 36px;
`;

const WarehouseBodyLabel = styled.label`
  display: block;
  padding: 8px 16px 8px 0;
  border-right: 1px solid #c9c9c9;
`;
const WarehouseBodyData = styled.span`
  display: block;
  padding: 8px 0;
`;

const RenterInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RenterInfoContainerLeft = styled.div``;

const RenterInfoContainerRight = styled.div``;
