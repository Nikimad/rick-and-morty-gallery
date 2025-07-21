import styled from 'styled-components';
import { Logo } from './Logo';
import { FiltersForm } from '../filters/Filters';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <FiltersForm />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 930px) {
    justify-content: center;
    gap: 20px;
  }

  @media (max-width: 600px) {
    display: grid;
  }
`;
