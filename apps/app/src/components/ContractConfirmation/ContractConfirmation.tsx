import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { CreateContract, useContract } from '@/hooks';

export type ContractConfirmationProps = {
  onAgreedChange?: (value: boolean) => void;
  getContract?: (contract: string) => void;
  defaultAgreed?: boolean;
};

export const ContractConfirmation = ({
  defaultAgreed = false,
  onAgreedChange,
  getContract,
}: ContractConfirmationProps) => {
  const { createContract, testOptions, viewContract } = useContract();
  //   const contractRef = useRef<CreateContract>();

  useEffect(() => {
    createContract({ pdfOptions: testOptions }).getBase64((data) => {
      getContract?.(data);
      viewContract({ containerId: 'contract', base64: data });
    });
  }, []);

  //   const handleViewContract = () => {
  //     const { current: contract } = contractRef;

  //     if (contract) {
  //       contract.getBase64((data) => viewContract({ containerId: 'contract', base64: data }));
  //     }
  //   };

  return (
    <Container>
      <Title>Xem trước hợp đồng</Title>
      <Body>
        {/* <Button onClick={handleViewContract}>Xem trước hợp đồng</Button> */}
        <ContractContainer />
      </Body>
      <CheckboxGroup>
        <Checkbox
          defaultChecked={defaultAgreed}
          id="agree-checkbox"
          onChange={(e) => {
            onAgreedChange?.(e.target.checked);
          }}
        />
        <Label htmlFor="agree-checkbox">Tôi đồng ý với nội dung của hợp đồng trên</Label>
      </CheckboxGroup>
    </Container>
  );
};

const Container = styled.div``;
const Title = styled.h2``;
const Body = styled.div`
  padding: 16px 24px;
  border-radius: 16px;
  max-width: 1024px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ContractContainer = styled.div.attrs({ id: 'contract' })`
  height: 1200px;
`;

const CheckboxGroup = styled.div`
  margin-top: 24px;
  align-items: center;
  display: flex;
  gap: 16px;
`;

const Label = styled.label``;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 24px;
  height: 24px;
`;
