import styled from 'styled-components';

import { Gender } from './Gender';
import { Text } from '../common';

export const Character = ({ name, gender, isPopup }) => (
  <StyledCharacterContainer>
    <StyledName component="h2" fontSize={`${isPopup ? 22 : 24}px`}>
      {name}
    </StyledName>
    <Gender gender={gender} />
  </StyledCharacterContainer>
);

const StyledCharacterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const StyledName = styled(Text)`
  transition: color 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;

  @media (max-width: 450px) {
    max-width: 130px;
    font-size: 18px;
  }
`;
