import styled from 'styled-components';

import { CharacterImage } from './CharacterImage';
import { MainInfo } from './MainInfo';

export const PopupMainInfo = ({
  image,
  name,
  gender,
  status,
  species,
  type
}) => {
  return (
    <MainInfoStyledContainer>
      <StyledCharacterImage src={image} alt={name} />
      <StyledMainInfo
        name={name}
        gender={gender}
        status={status}
        species={species}
        type={type}
        isPopup={true}
      />
    </MainInfoStyledContainer>
  );
};

const MainInfoStyledContainer = styled.div`
  display: grid;
  gap: 10px;
  justify-items: center;
`;

const StyledMainInfo = styled(MainInfo)`
  justify-items: center;
`;

const StyledCharacterImage = styled(CharacterImage)`
  border-radius: 5px;
  margin: 0 auto;
  max-width: 350px;
  max-height: 350px;
  width: 100%;
`;
