import styled, { css } from 'styled-components';

import { Text } from '../common';

export const EpisodeItem = ({ name, episode, length }) => {
  const formatEpisode = (ep) => {
    const match = ep.match(/^S0?(\d+)E0?(\d+)$/i);
    if (!match) return ep;

    const [, season, episode] = match;

    return `Season ${Number(season)} - Ep. ${Number(episode)}`;
  };

  return (
    <StyledEpisodeItem _length={length}>
      <StyledEpisodeItemMarking>
        {formatEpisode(episode)}
      </StyledEpisodeItemMarking>
      <Text>{name}</Text>
    </StyledEpisodeItem>
  );
};

const StyledEpisodeItem = styled.li`
  width: 100%;
  display: grid;
  gap: 8px;
  align-items: center;
  padding: 10px 0;

  ${({ _length }) =>
    _length > 20 &&
    css`
      gap: 0px;
      width: 95%;
      border-bottom: 2px solid #eee;

      @media (max-width: 600px) {
        gap: 10px;
      }
    `}
`;

const StyledEpisodeItemMarking = styled(Text)`
  color: #83bf46;
`;
