import { useCallback } from 'react';

import styled from 'styled-components';

import { Text, HiddenText } from '../common';

export const Label = ({ id, comboboxRef, isHidden, children }) => {
  const handleClick = useCallback(() => {
    comboboxRef.current?.focus();
  }, [comboboxRef]);

  if (isHidden) {
    return <HiddenText id={`${id}-label`}>{children}</HiddenText>;
  }

  return (
    <StyledLabel id={`${id}-label`} onClick={handleClick}>
      {children}
    </StyledLabel>
  );
};

const StyledLabel = styled(Text)`
  cursor: default;
`;
