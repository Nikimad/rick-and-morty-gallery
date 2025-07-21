import styled from 'styled-components';

import { ChevronUpIcon, ChevronDownIcon, CloseIcon } from '../icons';

export const ComboboxButton = ({ hasValue, isExpanded, onClear, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (hasValue) {
      onClear();
    }
    if (!hasValue) {
      onClick();
    }
  };

  return (
    <StyledButton
      type="button"
      aria-label={hasValue ? 'Clear selected value' : 'Toggle options'}
      onClick={handleClick}
    >
      {hasValue ? (
        <CloseIcon />
      ) : isExpanded ? (
        <ChevronUpIcon />
      ) : (
        <ChevronDownIcon />
      )}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  color: inherit;
  font-size: 1rem;
  transition: 0.3s;

  &:hover {
    color: #83bf46;
  }
`;
