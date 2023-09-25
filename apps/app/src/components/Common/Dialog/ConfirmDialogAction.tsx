import { Close as RadixDialogClose } from '@radix-ui/react-dialog';
import styled from 'styled-components';

import { Button } from '../Button';

export type ConfirmDialogActionProps = {
  acceptText?: string;
  cancelText?: string;
  onAccept?: () => void;
  onCancel?: () => void;
};

export function ConfirmDialogAction({
  acceptText = 'Đồng ý',
  cancelText = 'Hủy',
  onAccept,
  onCancel,
}: ConfirmDialogActionProps) {
  return (
    <ButtonGroup>
      <RadixDialogClose asChild>
        <Button color={'danger'} onClick={onCancel}>
          {cancelText}
        </Button>
      </RadixDialogClose>
      <Button onClick={onAccept}>{acceptText}</Button>
    </ButtonGroup>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 18px;
`;
