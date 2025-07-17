import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { PopupEpisodes } from './PopupEpisodes';
import { PopupHeader } from './PopupHeader';
import { PopupInfo } from './PopupInfo';

export function Popup({ data, isPopupOpen, closePopup }) {
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

  const popupRef = useRef(null);

  const [isPopupVisible, setIsPopupVisible] = useState(isPopupOpen);

  const hidePopup = useCallback(() => {
    if (isPopupVisible) setIsPopupVisible(false);
  }, [isPopupVisible]);

  const handleClosePopup = useCallback(() => {
    if (!isPopupVisible) closePopup();
  }, [isPopupVisible, closePopup]);

  const handleEscape = useCallback(
    (e) => {
      if (e.key === 'Escape' && isPopupVisible) {
        hidePopup();
      }
    },
    [isPopupVisible, hidePopup]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  const popupRoot = document.getElementById('popup-root');

  return createPortal(
    <PopupContainer
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      aria-describedby="popup-description"
      onAnimationEnd={handleClosePopup}
      visible={isPopupVisible}
    >
      <PopupBackdrop onClick={hidePopup} />
      <StyledPopup ref={popupRef} tabIndex="-1">
        <CloseIcon onClick={hidePopup} />

        <h2 id="popup-title" style={{ display: 'none' }}>
          {name}
        </h2>
        <p id="popup-description" style={{ display: 'none' }}>
          Character details for {name}, species {species}, status {status}.
        </p>

        <PopupHeader
          name={name}
          gender={gender}
          image={image}
          status={status}
          species={species}
          type={type}
        />

        <PopupInfo origin={origin} location={location} />
        <PopupEpisodes episodes={episodes} />
      </StyledPopup>
    </PopupContainer>,
    popupRoot
  );
}

const PopupContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  color: #fff;
  inset: 0;

  animation-fill-mode: forwards;

  ${({ visible }) =>
    visible
      ? css`
          animation-duration: 0.3s;
          animation-name: fadeIn;
        `
      : css`
          animation-duration: 0.2s;
          animation-name: fadeOut;
        `}

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const PopupBackdrop = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  inset: 0;
`;

const StyledPopup = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  height: auto;
  max-height: 90vh;
  margin-top: calc(10vh - 20px);
  background: #263750;
  border-radius: 15px;
  padding: 20px 40px;
  border: 2px solid #83bf46;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 930px) {
    width: 80%;
  }

  @media (max-width: 600px) {
    width: 95%;
  }
`;

const CloseIcon = styled.button`
  cursor: pointer;
  position: fixed;
  right: calc(30% - 10px);
  top: calc(10vh - 30px);
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #83bf46aa;
  transition: background-color 0.3s;

  &:hover {
    background-color: #83bf46ff;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 2px;
    left: 50%;
    background: #fff;
  }

  &:before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  @media (max-width: 930px) {
    right: calc(10% - 10px);
  }

  @media (max-width: 600px) {
    right: calc(3% - 10px);
  }
`;
