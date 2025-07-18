import styled from 'styled-components';

import { useData } from '../hooks/useData';

import { Loader, Text } from './common';

export function AppState() {
  const { isFetching, isError } = useData();

  if (isError) {
    return (
      <AppStateContainer>
        <Text color="#ccc">
          An error has occurred. Try other search parameters.
        </Text>
      </AppStateContainer>
    );
  }

  if (isFetching) {
    return (
      <AppStateContainer>
        <Loader />
      </AppStateContainer>
    );
  }

  return null;
}

const AppStateContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
