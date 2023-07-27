import * as ReactDOM from 'react-dom/client';
import styled, { createGlobalStyle } from 'styled-components';

import AppRouter from './AppRouter';
import Header from './components/Header/Header';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Signika Negative', sans-serif;
        margin: 0;
    }
`;

const BackgroundWrapper = styled.div`
  background-color: #eee;
  padding: 16px 0;
`;

const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto 32px;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Header></Header>
    <GlobalStyle />
    <BackgroundWrapper>
      <Wrapper>
        <AppRouter />
      </Wrapper>
    </BackgroundWrapper>
  </>,
);
