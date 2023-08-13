import { blackA, green, violet } from '@radix-ui/colors';
import * as stitches from '@stitches/react';
import { ReactNode } from 'react';

type ButtonProps = {
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  type?: 'submit';
};

const Button = (props: ButtonProps) => {
  const { onClick, children, color, disabled, type } = props || {};

  return (
    <StyledButton color={color || 'primary'} disabled={disabled} type={type} onClick={() => onClick && onClick()}>
      {children}
    </StyledButton>
  );
};

const StyledButton = stitches.styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  backgroundColor: violet.violet9,
  color: 'white',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: violet.violet8 },
  // '&:focus': { boxShadow: `0 0 0 2px black` },
  cursor: 'pointer',
  variants: {
    color: {
      secondary: {
        backgroundColor: 'white',
        color: 'black',
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, .1)' },
        // '&:focus': { boxShadow: `0 0 0 2px black` },
      },
      primary: {},
    },
  },
});

export default Button;
