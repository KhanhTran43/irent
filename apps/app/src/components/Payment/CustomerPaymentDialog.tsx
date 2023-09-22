import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { stripePromise } from '@/libs';

import { ConfirmDialog, ConfirmDialogProps } from '../Common/Dialog';

const Error = styled.div`
  color: red;
  margin-top: 12px;
`;

export type CustomerPaymentDialogProps = ConfirmDialogProps & {
  clientSecret?: string | (() => Promise<string>);
  onSucceed?: () => void;
};

export function CustomerPaymentDialog(props: CustomerPaymentDialogProps) {
  const { onSucceed, children, clientSecret, ...dialogProps } = props;

  const [message, setMessage] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [isResponded, setResponded] = useState(false);
  const clientSecretRef = useRef<string>();

  useEffect(() => {
    if (typeof clientSecret === 'function') {
      setLoading(true);
      clientSecret().then((data) => {
        console.log(data);

        clientSecretRef.current = data;
        setLoading(false);
      });
    } else {
      clientSecretRef.current = clientSecret;
    }
  }, []);

  const handleSubmit = async () => {
    const stripe = await stripePromise;

    if (!stripe || !clientSecretRef.current) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecretRef.current);

    console.log(paymentIntent, error);

    switch (error?.type) {
      case undefined:
        break;
      case 'card_error':
      case 'validation_error':
        setMessage(error.message as string);
        break;
      default:
        break;
    }

    switch (paymentIntent?.status) {
      case undefined:
        break;
      case 'succeeded':
        setResponded(true);
        setMessage('Thanh toán thành công!');
        props.onSucceed?.();
        break;
      case 'processing':
        setResponded(true);
        setMessage('Your payment is processing.');
        break;
      case 'requires_payment_method':
        setResponded(true);
        setMessage('Your payment was not successful, please try again.');
        break;
      default:
        setMessage('Something went wrong.');
        break;
    }

    setLoading(false);
  };

  return (
    <ConfirmDialog
      {...dialogProps}
      acceptText="Thanh toán"
      fallback={<div>{message}</div>}
      isLoading={isLoading}
      showFallBack={isResponded}
      title="Xác nhận thanh toán"
      onAccept={() => {
        handleSubmit();
        dialogProps.onAccept?.();
      }}
    >
      <div>
        <div>
          {children}
          {message && <Error id="payment-message">{message}</Error>}
        </div>
      </div>
    </ConfirmDialog>
  );
}
