import { useCallback, useEffect, useState } from 'react';

import styled, { css } from 'styled-components';

import { EPISODES_EP } from '../../constants';
import { getData } from '../../utils/getData';

import { Loader, Text } from '../common';
import { EpisodeItem } from './EpisodeItem';

export const EpisodesList = ({ episodesUrls, episodes, onEpisodesAdd }) => {
  const shouldFetchEpisodes =
    episodesUrls?.length && episodesUrls.length !== episodes.length;

  const [isLoading, setIsLoading] = useState(shouldFetchEpisodes);

  const fetchEpisodes = useCallback(async () => {
    setIsLoading(true);

    const episodesIds = episodesUrls
      .map((ep) => ep.match(/\d+$/)?.[0])
      .filter(Boolean);

    const [isError, data] = await getData(
      `${EPISODES_EP}/${episodesIds.join(',')}`
    );

    if (!isError && data) {
      onEpisodesAdd(Array.isArray(data) ? data : [data]);
    }

    if (isError) {
      onEpisodesAdd([]);
    }

    setIsLoading(false);
  }, [episodesUrls, onEpisodesAdd]);

  useEffect(() => {
    if (shouldFetchEpisodes) {
      fetchEpisodes();
    }
  }, [shouldFetchEpisodes, fetchEpisodes]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <StyledEpisodesListWrapper>
      <StyledEpisodesListName>Participated in episodes:</StyledEpisodesListName>
      <StyledEpisodesList _length={episodes.length}>
        {episodes?.map(({ id, name, episode }) => (
          <EpisodeItem
            key={id}
            name={name}
            episode={episode}
            length={episodes.length}
          />
        ))}
      </StyledEpisodesList>
    </StyledEpisodesListWrapper>
  );
};

const StyledEpisodesListWrapper = styled.ul`
  display: grid;
  gap: 8px;
`;

const StyledEpisodesListName = styled(Text)`
  color: #ccc;
`;

const StyledEpisodesList = styled.ul`
  display: grid;

  ${({ _length }) =>
    _length > 20 &&
    css`
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(${Math.ceil(_length / 2)}, 1fr);

      @media (max-width: 600px) {
        grid-auto-flow: row;
        grid-template-rows: repeat(${_length}, 1fr);
      }
    `}

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
