import styled from 'styled-components';

import { useCallback, useEffect, useState } from 'react';
import { useData } from '../hooks/useData';

export const Pagination = () => {
  const [pages, setPages] = useState([]);
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();

  const pageClickHandler = useCallback(
    (index) => () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActivePage(index);
      setApiURL(pages[index]);
    },
    [setActivePage, setApiURL, pages]
  );

  useEffect(() => {
    const createdPages = Array.from({ length: info.pages }, (_, i) => {
      const URLWithPage = new URL(apiURL);

      URLWithPage.searchParams.set('page', i + 1);

      return URLWithPage;
    });

    setPages(createdPages);
  }, [info, apiURL]);

  if (pages.length <= 1) return null;

  return (
    <StyledPagination>
      {activePage > 1 && (
        <>
          <Page onClick={pageClickHandler(0)}>« First</Page>
          <Ellipsis>…</Ellipsis>
        </>
      )}
      {activePage > 0 && (
        <Page onClick={pageClickHandler(activePage - 1)}>{activePage}</Page>
      )}
      <Page active aria-current="page">
        {activePage + 1}
      </Page>
      {activePage < pages.length - 1 && (
        <Page onClick={pageClickHandler(activePage + 1)}>{activePage + 2}</Page>
      )}
      {activePage < pages.length - 2 && (
        <>
          <Ellipsis>…</Ellipsis>
          <Page onClick={pageClickHandler(pages.length - 1)}>Last »</Page>
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
