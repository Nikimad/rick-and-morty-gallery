import styled from 'styled-components';

import { Text } from '../common';

const AdditioalInfoColumn = ({ title, text }) =>
  text !== 'unknown' && (
    <StyledAdditionalInfoColumn>
      <StyledAdditionalInfoColumnTitle component="p">
        {title}
      </StyledAdditionalInfoColumnTitle>
      <StyledAdditionalInfoColumnText component="p">
        {text}
      </StyledAdditionalInfoColumnText>
    </StyledAdditionalInfoColumn>
  );

export const AdditioalInfo = ({ origin, location }) => {
  return (
    <StyledAdditionalInfo>
      <AdditioalInfoColumn title="First Seen in:" text={origin?.name} />
      <AdditioalInfoColumn title="Last known location:" text={location?.name} />
    </StyledAdditionalInfo>
  );
};

const StyledAdditionalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledAdditionalInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 48%;

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const StyledAdditionalInfoColumnTitle = styled(Text)`
  color: #ccc;
`;

const StyledAdditionalInfoColumnText = styled(Text)`
  color: #83bf46;
`;
