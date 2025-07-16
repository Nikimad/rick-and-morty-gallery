import { useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { PopupEpisodes } from './PopupEpisodes';
import { PopupHeader } from './PopupHeader';
import { PopupInfo } from './PopupInfo';

export function Popup({ settings: { visible, content = {} }, setSettings }) {
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
  } = content;

  const togglePopup = useCallback(
    (e) => {
      if (e.currentTarget !== e.target) {
        return;
      }

      setSettings((prevState) => ({
        ...prevState,
        visible: !prevState.visible
      }));
    },
    [setSettings]
  );

  const handleEscape = useCallback(
    (e) => {
      if (visible && e.key === 'Escape') {
        setSettings((prevState) => ({
          ...prevState,
          visible: false
        }));
      }
    },
    [visible, setSettings]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  return (
    <PopupContainer visible={visible}>
      <PopupBackdrop onClick={togglePopup} />
      <StyledPopup>
        <CloseIcon onClick={togglePopup} />

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
    </PopupContainer>
  );
}

const PopupContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  color: #fff;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visible 0.3s;

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      visibility: initial;
      pointer-events: all;
    `}
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
