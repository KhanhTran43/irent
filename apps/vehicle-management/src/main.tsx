import * as ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header/Header';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Signika Negative', sans-serif;
        margin: 0;
    }
`;

const Wrapper = styled.div`
  width: 1024px;
  margin: 16px auto 32px;
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Header></Header>
    <GlobalStyle />
    <Wrapper>
      <AppRouter />
    </Wrapper>
  </>
);
