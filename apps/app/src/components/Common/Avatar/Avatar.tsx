import styled from 'styled-components';

type AvatarProps = {
  name: string;
};

export const Avatar = (props: AvatarProps) => {
  const { name } = props;
  const nameChars = name.split(' ');

  return <Container>{`${nameChars[0][0]}${nameChars[nameChars.length - 1][0]}`}</Container>;
};

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

