import { HeartFilledIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '../../auth';
import { useAuthContext } from '../../auth/context/AuthContext';
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
`;

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
  const { isAuthenticated, user } = useAuthStore(({ isAuthenticated, user }) => ({
    isAuthenticated,
    user,
  }));

  return (
    <Container>
      <LeftSide>
        <Link to={'/home'}>
          <Logo />
        </Link>
        <Nav>
          <UlContainerLeft>
            <Link to={'/home'}>
              <LeftSideItem>Home</LeftSideItem>
            </Link>
            <Link to={'/list'}>
              <LeftSideItem>My Warehouses</LeftSideItem>
            </Link>
          </UlContainerLeft>
        </Nav>
      </LeftSide>
      <RightSide>
        <Nav>
          {isAuthenticated ? (
            <div>{`Hi, ${user?.username}`}</div>
          ) : (
            <UlContainerRight>
              <Link to={'/sign-up'}>
                <RightSideItem>Sign up</RightSideItem>
              </Link>
              <Link to={'/login'}>
                <RightSideItem>Log in</RightSideItem>
              </Link>
            </UlContainerRight>
          )}
        </Nav>
      </RightSide>
    </Container>
  );
};

export default Header;
