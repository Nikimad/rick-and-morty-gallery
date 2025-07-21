import { useCallback } from 'react';

import styled, { css } from 'styled-components';

export const Option = ({
  id,
  isSelected,
  isPreselected,
  option,
  position,
  onMouseOver,
  onClick,
  children
}) => {
  const handleMouseEnter = useCallback(() => onMouseOver(position), [
    position,
    onMouseOver
  ]);

  const handleOnClick = useCallback(() => onClick(position), [
    position,
    onClick
  ]);

  return (
    <StyledOption
      id={id}
      role="option"
      tabIndex={-1}
      isPreselected={isPreselected}
      isSelected={isSelected}
      aria-selected={isSelected}
      onMouseEnter={handleMouseEnter}
      onClick={handleOnClick}
      data-value={option.value}
    >
      {children}
    </StyledOption>
  );
};

const StyledOption = styled.li`
  display: block;
  color: #000;
  cursor: pointer;
  padding: 20px 5px;
  transition: background-color 0.2s;

  ${({ isSelected }) =>
    isSelected &&
    css`
      font-weight: bold;
    `}

  ${({ isPreselected }) =>
    isPreselected &&
    css`
      background-color: #e6f2da;
    `}
`;
