import { blackA, blue } from '@radix-ui/colors';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as stitches from '@stitches/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, useUpdate } from 'react-admin';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { apiUrl } from '../../provider';

export const RequestWarehouseDetails = () => {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [rejectedReason, setRejectedReason] = useState('');
  const [update] = useUpdate('warehouse', {
    id,
    data: {
      status,
      ...(status === 2 && { rejectedReason }),
    },
    previousData: warehouse,
  });

  useEffect(() => {
    axios
      .post<any, any>(`${apiUrl}/warehouse/static/${id}`, {
        includes: ['RentedWarehouses', 'Comments', 'Comments.User', 'Images'],
      })
      .then((v) => {
        setWarehouse(v.data);
      });
  }, []);

  return (
    <>
      {warehouse ? (
        <>
          <h1>{warehouse.name || ''}</h1>
          <Wrapper>
            <FlexField>
              <LeftSide>
                <Title>Địa chỉ</Title>
                <Title>Giá</Title>
                <Title>Diện tích</Title>
                <Title>Số tầng</Title>
                <Title>Số cửa</Title>
                <Title>Ảnh</Title>
              </LeftSide>
              <RightSide>
                <Text>{warehouse.address}</Text>
                <Text>{(warehouse.price * 1000).toLocaleString('vi-VN')} VND / tháng</Text>
                <Text>{warehouse.area} mét vuông</Text>
                <Text>{warehouse.floors} tầng</Text>
                <Text>{warehouse.doors} cửa</Text>
                <ImageContainer $hasSrc={!!warehouse.images.length}>
                  {warehouse.images.length ? (
                    warehouse.images.map((it: any) => <Image key={it.originalUrl} src={it.originalUrl} />)
                  ) : (
                    <></>
                  )}
                </ImageContainer>
              </RightSide>
            </FlexField>
            <Field>
              <Title>Chi tiết kho bãi</Title>
              <Description dangerouslySetInnerHTML={{ __html: warehouse.description }} />
            </Field>
            <UpdateZone>
              <Title>Xác nhận trạng thái</Title>
              <RadioGroupRoot
                onValueChange={(e) => {
                  setStatus(Number(e));
                }}
              >
                <Flex css={{ alignItems: 'center' }}>
                  <RadioGroupItem id="approve" value="1">
                    <RadioGroupIndicator />
                  </RadioGroupItem>
                  <Label htmlFor="approve">Đồng ý</Label>
                </Flex>

                <Flex css={{ alignItems: 'center' }}>
                  <RadioGroupItem id="reject" value="2">
                    <RadioGroupIndicator />
                  </RadioGroupItem>
                  <Label htmlFor="reject">Từ chối</Label>
                </Flex>
              </RadioGroupRoot>
              {status === 2 ? (
                <TextareaContainer>
                  <Textarea
                    placeholder="Nhập lí do từ chối"
                    onChange={(e) => {
                      setRejectedReason(e.target.value);
                    }}
                  />
                </TextareaContainer>
              ) : (
                <></>
              )}
              <div>
                <ConfirmButton
                  onClick={() => {
                    if (!status || (status === 2 && !rejectedReason)) {
                      return;
                    }
                    update();
                  }}
                >
                  <span>Cập nhật</span>
                </ConfirmButton>
              </div>
            </UpdateZone>
          </Wrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FlexField = styled.div`
  display: flex;
  gap: 48px;
  align-items: start;
`;
const LeftSide = styled.div``;
const RightSide = styled.div``;

const Field = styled.div``;
const UpdateZone = styled.div`
  padding: 16px;
  border: 1px solid #c2c2c2;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 2px #2196f3;
  text-align: center;
`;
const Title = styled.h4``;
const Text = styled.h4`
  font-weight: normal;
`;

const Description = styled.div`
  border: 1px solid #c2c2c2;
  padding: 8px 16px;
  border-radius: 8px;
`;

const ShowImageStyle = css`
  height: fit-content;
  padding: 4px;

  img {
    height: 120px;
    width: 120px;
  }
`;

const ImageContainer = styled.div<{ $hasSrc?: boolean }>`
  height: 0;
  ${({ $hasSrc }) => ($hasSrc ? ShowImageStyle : '')}
  margin: 0 auto;
  margin-top: 8px;
  border-radius: 16px;
  display: flex;
  gap: 8px;
`;

const Image = styled.img.attrs({ id: 'uploaded-image' })`
  border-radius: 16px;
  object-fit: cover;
  object-position: center;
`;
const RadioGroupRoot = stitches.styled(RadioGroup.Root, {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  alignItems: 'center',
});

const RadioGroupItem = stitches.styled(RadioGroup.Item, {
  all: 'unset',
  backgroundColor: 'white',
  width: 25,
  height: 25,
  borderRadius: '100%',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: blue.blue3 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
});

const RadioGroupIndicator = stitches.styled(RadioGroup.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: 11,
    height: 11,
    borderRadius: '50%',
    backgroundColor: blue.blue10,
  },
});

const Flex = stitches.styled('div', { display: 'flex' });

const Label = stitches.styled('label', {
  color: 'black',
  fontSize: 15,
  lineHeight: 1,
  paddingLeft: 15,
});

const ConfirmButton = styled(Button)`
  margin-top: 32px;
`;

const TextareaContainer = styled.div``;

const Textarea = styled.textarea`
  width: 450px;
  margin-top: 16px;
  height: 200px;
  padding: 8px 16px;
  border-radius: 4px;
  font-family: inherit;
`;

