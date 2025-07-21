import styled, { css } from 'styled-components';

export const ListBox = ({ id, isExpanded, children }) => (
  <StyledListBox
    id={`${id}-listbox`}
    role="listbox"
    tabIndex={-1}
    inert={!isExpanded ? '' : undefined}
    aria-labelledby={`${id}-label`}
    isExpanded={isExpanded}
  >
    {children}
  </StyledListBox>
);

const StyledListBox = styled.ul`
  background-color: #fff;
  position: absolute;
  z-index: 1;
  bottom: -10px;
  width: 100%;
  border-radius: 16px;
  box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(100%);
  overflow-x: hidden;
  padding: 0;
  margin: 0;

  ${({ isExpanded }) =>
    !isExpanded &&
    css`
      display: none;
    `}
`;
