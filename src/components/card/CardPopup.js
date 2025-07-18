import styled from 'styled-components';

import { PopupMainInfo } from './PopupMainInfo';
import { AdditioalInfo } from './AdditionalInfo';
import { EpisodesList } from './EpisodesList';

export const CardPopup = ({ data }) => {
  const {
    name,
    gender,
    image,
    status,
    species,
    type,
    origin,
    location,
    episode: episodes
  } = data;

  return (
    <StyledCardPopup>
      <PopupMainInfo
        name={name}
        gender={gender}
        image={image}
        status={status}
        species={species}
        type={type}
      />
      <AdditioalInfo origin={origin} location={location} />
      <EpisodesList episodes={episodes} />
    </StyledCardPopup>
  );
};

const StyledCardPopup = styled.div`
  display: grid;
  gap: 40px;
`;
