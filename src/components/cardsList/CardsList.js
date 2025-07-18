import styled from 'styled-components';

import { useData } from '../../hooks/useData';

import { Card } from '../card';

export const CardsList = () => {
  const { characters } = useData();

  if (!characters.length) {
    return null;
  }

  return (
    <StyledList>
      {characters.map((props) => (
        <Card key={props.id} {...props} />
      ))}
    </StyledList>
  );
};

const StyledList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
