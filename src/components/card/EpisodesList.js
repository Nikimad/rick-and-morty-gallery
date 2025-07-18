import { useEffect, useState } from 'react';

import styled, { css } from 'styled-components';
import axios from 'axios';

import { Loader, Text } from '../common';
import { EpisodeItem } from './EpisodeItem';

const API_EPISODES_URL = 'https://rickandmortyapi.com/api/episode';

export const EpisodesList = ({ episodes }) => {
  const [series, setSeries] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!episodes?.length) return;

    const fetchEpisodes = async () => {
      try {
        setIsFetching(true);
        const episodesIds = episodes
          .map((ep) => ep.match(/\d+$/)?.[0])
          .filter(Boolean);
        const { data } = await axios.get(
          `${API_EPISODES_URL}/${episodesIds.join(',')}`
        );
        setSeries(Array.isArray(data) ? data : [data]);
      } catch (error) {
        setSeries([]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchEpisodes();
  }, [episodes]);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <StyledEpisodesListWrapper>
      <StyledEpisodesListName>Participated in episodes:</StyledEpisodesListName>
      <StyledEpisodesList _length={series.length}>
        {series?.map(({ id, name, episode }) => (
          <EpisodeItem
            key={id}
            name={name}
            episode={episode}
            length={series.length}
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
