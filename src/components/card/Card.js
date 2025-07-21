import { useCallback, useRef, useState } from 'react';
import { usePopup } from '../../hooks/usePopup';

import styled from 'styled-components';

import { Popup } from '../popup';
import { CharacterImage } from './CharacterImage';
import { MainInfo } from './MainInfo';
import { CardPopup } from './CardPopup';

export const Card = (props) => {
  const { status, name, species, type, gender, image } = props;

  const cardRef = useRef(null);
  const [episodesList, setEpisodesList] = useState([]);
  const { isPopupOpen, openPopup, closePopup } = usePopup(cardRef);

  const handleAddEpisodes = useCallback(
    (episodes) => setEpisodesList(episodes),
    []
  );

  return (
    <StyledCardContainer onClick={openPopup} ref={cardRef} tabIndex={0}>
      <CharacterImage src={image} alt={name} />
      <MainInfo
        name={name}
        gender={gender}
        status={status}
        species={species}
        type={type}
      />
      {isPopupOpen && (
        <Popup
          isPopupOpen={isPopupOpen}
          openPopup={openPopup}
          closePopup={closePopup}
        >
          <CardPopup
            data={props}
            episodesList={episodesList}
            onEpisodesAdd={handleAddEpisodes}
          />
        </Popup>
      )}
    </StyledCardContainer>
  );
};

const StyledCardContainer = styled.li`
  display: grid;
  align-content: start;
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  background: #263750;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover .card-title {
    color: #83bf46;
  }
`;
