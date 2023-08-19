import { blackA, violetDark } from '@radix-ui/colors';
import * as stitches from '@stitches/react';
import { ReactNode } from 'react';

export type ButtonProps = {
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  type?: 'submit';
};

export const Button = (props: ButtonProps) => {
  const { onClick, children, color, disabled, type } = props || {};

  return (
    <StyledButton color={color || 'primary'} disabled={disabled} type={type} onClick={() => onClick && onClick()}>
      {children}
    </StyledButton>
  );
};

const StyledButton = stitches.styled('button', {
  all: 'unset',
  minWidth: 105,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  backgroundColor: violetDark.violet10,
  color: 'white',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  transition: 'background-color 0.5s ease, opacity 0.5s ease',
  '&:hover:enabled': { backgroundColor: violetDark.violet7 },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  cursor: 'pointer',
  variants: {
    color: {
      secondary: {
        backgroundColor: 'white',
        color: 'black',
        '&:hover:enabled': { backgroundColor: 'rgba(0, 0, 0, .1)' },
        '&:disabled': {
          backgroundColor: 'rgba(136, 136, 136, 0.3)',
        },
      },
      primary: {},
    },
  },
});

export default Button;
