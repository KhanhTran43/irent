import { Close as RadixDialogClose, Title as RadixDialogTitle } from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { Loading } from '@/components/Fallback';

import { Button } from '../Button';
import { Dialog, DialogProps } from './Dialog';

export type ConfirmDialogProps = DialogProps & {
  title?: string;
  acceptText?: string;
  cancelText?: string;
  onAccept?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  fallback?: ReactNode;
  showFallBack?: boolean;
};

export function ConfirmDialog({
  children,
  title = 'Xác nhận',
  acceptText = 'Đồng ý',
  cancelText = 'Hủy',
  onAccept,
  onCancel,
  isLoading = false,
  fallback,
  showFallBack = false,
  ...props
}: ConfirmDialogProps) {
  return (
    <Dialog
      {...props}
      onDialogClose={(data) => {
        props.onDialogClose?.(data);
        onCancel?.();
      }}
    >
      {isLoading ? (
        <Loading size={30} />
      ) : (
        <>
          {showFallBack ? (
            fallback
          ) : (
            <>
              <Title>{title}</Title>
              {children}
              <ButtonGroup>
                <RadixDialogClose asChild>
                  <Button color={'danger'} onClick={onCancel}>
                    {cancelText}
                  </Button>
                </RadixDialogClose>
                <Button onClick={onAccept}>{acceptText}</Button>
              </ButtonGroup>
            </>
          )}
        </>
      )}
    </Dialog>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 18px;
`;

const Title = styled(RadixDialogTitle)`
  margin-bottom: 12px;
`;
