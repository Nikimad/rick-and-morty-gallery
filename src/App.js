import styled from 'styled-components';

import { Header, Main, CardsList, Pagination } from './components';

export const App = () => (
  <StyledAppWrapper>
    <Header />
    <Main>
      <CardsList />
      <Pagination />
    </Main>
  </StyledAppWrapper>
);

const StyledAppWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;
  max-width: 80%;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 95%;
  }

  @media (max-width: 930px) {
    max-width: 85%;
  }

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;
