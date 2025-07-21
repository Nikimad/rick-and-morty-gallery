import { useCallback } from 'react';

import styled from 'styled-components';

import { useAppState } from '../hooks/useAppState';

export const Pagination = () => {
  const {
    data: { info },
    state: { page },
    changeState
  } = useAppState();

  const activePage = page > 0 ? page : page + 1;

  const handlePageOnClick = useCallback(
    (index) => () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      changeState({ page: index });
    },
    [changeState]
  );

  if (info.pages <= 1) return null;

  return (
    <StyledPagination>
      {activePage > 2 && (
        <>
          <Page onClick={handlePageOnClick(0)}>« First</Page>
          <Ellipsis>…</Ellipsis>
        </>
      )}
      {activePage > 1 && (
        <Page onClick={handlePageOnClick(activePage - 1)}>
          {activePage - 1}
        </Page>
      )}

      <Page active aria-current="page">
        {activePage}
      </Page>
      {activePage < info.pages && (
        <Page onClick={handlePageOnClick(activePage + 1)}>
          {activePage + 1}
        </Page>
      )}
      {page < info.pages - 1 && (
        <>
          <Ellipsis>…</Ellipsis>
          <Page onClick={handlePageOnClick(info.pages)}>Last »</Page>
        </>
      )}
    </StyledPagination>
  );
};

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
