import styled from 'styled-components';

import { Character } from './Character';
import { Status } from './Status';

export const MainInfo = ({
  name,
  gender,
  status,
  species,
  type,
  isPopup,
  className
}) => (
  <StyledMainInfo className={className}>
    <Character name={name} gender={gender} isPopup={isPopup} />
    <Status status={status} species={species} type={type} isPopup={isPopup} />
  </StyledMainInfo>
);

const StyledMainInfo = styled.div`
  display: grid;
  gap: 10px;
  color: #fff;
  padding: 20px;
`;
