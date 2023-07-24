import { HeartFilledIcon } from '@radix-ui/react-icons';
import styled from 'styled-components';
import Logo from '../Logo/Logo';

const Container = styled.header`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.108);
  display: flex;
  justify-content: space-between;
`;

const Nav = styled.nav`
  padding: 15px 30px;
`;

const UlContainerRight = styled.ul`
  display: flex;
  flex-direction: row-reverse;
  gap: 24px;
  list-style-type: none;
  margin: 0;
`;

const RightSideItem = styled.li`
  border-radius: 8px;
  padding: 4px 20px;
  border: 1px solid #505050;
  cursor: pointer;
`;

const LeftSide = styled.div`
  display: flex;
`;

const UlContainerLeft = styled.ul`
  display: flex;
  gap: 16px;
  list-style-type: none;
  margin: 0;
`

const LeftSideItem = styled.li`
  padding: 4px 20px;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: border-color 0.5s ease;

  &:hover {
    border-color: red;
  }
`;

const RightSide = styled.div``;

const Header = () => {
  return (
    <Container>
      <LeftSide>
        <Logo />
        <Nav>
          <UlContainerLeft>
            <LeftSideItem>Home</LeftSideItem>
            <LeftSideItem>My Warehouses</LeftSideItem>
          </UlContainerLeft>
        </Nav>
      </LeftSide>
      <RightSide>
        <Nav>
          <UlContainerRight>
            <RightSideItem>Login</RightSideItem>
            <RightSideItem>Sign up</RightSideItem>
          </UlContainerRight>
        </Nav>
      </RightSide>
    </Container>
  );
};

export default Header;
