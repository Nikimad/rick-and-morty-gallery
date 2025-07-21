import styled, { css } from 'styled-components';

export const Combobox = ({
  id,
  comboboxRef,
  isExpanded,
  value,
  onClick,
  onBlur,
  onKeyDown,
  children
}) => (
  <>
    <StyledCombobox
      id={id}
      role="combobox"
      tabIndex="0"
      isExpanded={isExpanded}
      isPlaceholder={value === ''}
      onClick={onClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      aria-expanded={isExpanded}
      aria-controls={`${id}-listbox`}
      aria-labelledby={`${id}-label`}
      aria-activedescendant={isExpanded && value ? `${id}-${value}` : undefined}
      ref={comboboxRef}
    >
      {children}
    </StyledCombobox>
  </>
);

const StyledCombobox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  overflow: hidden;
  background-color: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  padding: 8px;
  transition: 0.3s;

  &:focus-visible {
    outline: auto;
  }

  &:hover,
  &:focus-visible {
    background-color: #334466;
  }

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      &:focus-visible {
        outline: none;
      }
    `}

  ${({ isPlaceholder }) =>
    isPlaceholder &&
    css`
      color: #b3b3b3;
    `}
`;
