import styled from 'styled-components';

const Container = styled.header`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.108);
  display: flex;
  justify-content: space-between;
`;

const Nav = styled.nav`
  padding: 15px 30px;
`;

const UlContainer = styled.ul`
  display: flex;
  flex-direction: row-reverse;
  gap: 24px;
  list-style-type: none;
  margin: 0;
`;

const Item = styled.li`
  border-radius: 8px;
  padding: 4px 20px;
  border: 1px solid #505050;
  cursor: pointer;
`;

const Logo = styled.div`
  font-size: 32px;
  display: flex;
  align-items: center;
  padding: 0 36px;
  font-family: 'Pacifico', cursive;

  &:after {
    content: 'Stockly';
  }
`;

const Header = () => {
  return (
    <Container>
      <Logo />
      <Nav>
        <UlContainer>
          <Item>Login</Item>
          <Item>Sign up</Item>
        </UlContainer>
      </Nav>
    </Container>
  );
};

export default Header;
