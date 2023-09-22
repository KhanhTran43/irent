import { DotsVerticalIcon } from '@radix-ui/react-icons';
import styled from 'styled-components';

import { Option, Popover } from '../Common/Popover';

export type CardActions = {
  customHoverBackgroundColor?: string;
  title: string;
  onClick: () => void;
};

export type CardOptionsProps = {
  actions?: CardActions[];
  onClickThreeDots?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const CardOptions = ({ actions, onClickThreeDots }: CardOptionsProps) => {
  const handleOptionsClick = (e: React.MouseEvent<HTMLButtonElement>, onClick: () => void) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <Popover
      align="center"
      content={
        <Container>
          {actions?.map((option) => (
            <Option
              key={option.title}
              customHoverBackgroundColor={option.customHoverBackgroundColor}
              title={option.title}
              onClick={(e) => handleOptionsClick(e, option.onClick)}
            />
          ))}
        </Container>
      }
      side="right"
      sideOffset={2}
    >
      <OptionButton
        onClick={(e) => {
          e.stopPropagation();
          onClickThreeDots?.(e);
        }}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        <DotsVerticalIcon />
      </OptionButton>
    </Popover>
  );
};

const Container = styled.div`
  padding: 8px;
  border-radius: 4px;
  background: white;

  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  width: 164px;
`;

const OptionButton = styled.div`
  padding: 3px;
  border-radius: 50%;
  top: 4.5px;
  right: 5px;
  display: flex;
  position: absolute;

  &:hover {
    background-color: #80808061;
  }
`;
