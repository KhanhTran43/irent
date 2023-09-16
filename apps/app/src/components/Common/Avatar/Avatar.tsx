import styled, { css } from 'styled-components';

type AvatarProps = {
  name: string;
  size?: number;
};

export const Avatar = (props: AvatarProps) => {
  const { name } = props;
  const nameChars = name.split(' ');

  return <Container $size={props.size}>{`${nameChars[0][0]}${nameChars[nameChars.length - 1][0]}`}</Container>;
};

const Container = styled.div<{ $size?: number }>`
  background-color: rgba(0, 0, 0, 0.2);
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

Container.defaultProps = { $size: 64 };
