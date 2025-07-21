import styled from 'styled-components';

import { useAppState } from '../hooks/useAppState';

import { Loader, Text } from './common';

export const Main = ({ children }) => {
  const {
    meta: { isLoading, isError }
  } = useAppState();

  if (isError) {
    return (
      <StyledMain>
        <Text color="#ccc">
          An error has occurred. Try other search parameters.
        </Text>
      </StyledMain>
    );
  }

  if (isLoading) {
    return (
      <StyledMain>
        <Loader />
      </StyledMain>
    );
  }

  return children;
};

const StyledMain = styled.main`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
