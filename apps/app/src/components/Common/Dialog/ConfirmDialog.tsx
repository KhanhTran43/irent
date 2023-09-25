import { ReactNode } from 'react';
import styled from 'styled-components';

import { Loading } from '@/components/Fallback';

import { ConfirmDialogAction, ConfirmDialogActionProps } from './ConfirmDialogAction';
import { Dialog, DialogProps, DialogTitle } from './Dialog';

export type ConfirmDialogProps = DialogProps &
  ConfirmDialogActionProps & {
    title?: string;
    isLoading?: boolean;
    fallback?: ReactNode;
    showFallBack?: boolean;
  };

export function ConfirmDialog({
  children,
  title = 'Xác nhận',
  isLoading = false,
  fallback,
  showFallBack = false,
  acceptText,
  cancelText,
  onAccept,
  onCancel,
  ...props
}: ConfirmDialogProps) {
  const actionProps: ConfirmDialogActionProps = {
    acceptText,
    cancelText,
    onAccept,
    onCancel,
  };

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
            <Container>
              <DialogTitle>{title}</DialogTitle>
              {children}
              <ConfirmDialogAction {...actionProps} />
            </Container>
          )}
        </>
      )}
    </Dialog>
  );
}

const Container = styled.div`
  width: 500px;
`;
