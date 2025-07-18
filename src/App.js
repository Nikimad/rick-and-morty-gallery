import styled from 'styled-components';

import { useData } from './hooks/useData';

import { Pagination, CardsList, Header, AppState } from './components';

import { CharacterFilter } from './components/_filter/_Filter';

export const App = () => {
  const { isFetching, isError } = useData();

  return (
    <Main>
      <CharacterFilter />
      <Header />
      <AppState />
      {!isFetching && !isError && (
        <>
          <CardsList />
          <Pagination />
        </>
      )}
    </Main>
  );
};

const Main = styled.main`
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
