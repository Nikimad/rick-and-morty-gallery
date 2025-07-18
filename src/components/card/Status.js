import styled from 'styled-components';

import { Text } from '../common';

export const Status = ({ status, species, type, isPopup }) => (
  <>
    <StyledStatusContainer component="p" fontSize={isPopup ? '20px' : '16px'}>
      <StyledStatus status={status}>{status}</StyledStatus>
      &nbsp;-&nbsp;
      <Text>{species}</Text>
    </StyledStatusContainer>
    {type && <StyledType component="p">{type}</StyledType>}
  </>
);

const StyledStatusContainer = styled(Text)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 20px;
  margin: 0;
`;

const StyledStatus = styled(Text)`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  &::before {
    content: '';
    display: block;
    margin-right: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: ${({ status }) => {
      switch (status) {
        case 'Alive':
          return '#83bf46';
        case 'Dead':
          return '#ff5152';
        default:
          return '#968c9d';
      }
    }};
  }
`;

const StyledType = styled(Text)`
  color: #ccc;
`;
