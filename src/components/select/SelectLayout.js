import styled from 'styled-components';

import { Text } from '../common';
import { Label } from './Label';
import { Combobox } from './Combobox';
import { ComboboxButton } from './ComboboxButton';
import { ListBox } from './ListBox';
import { Option } from './Option';

export const SelectLayout = ({
  label,
  isLabelHidden,
  id,
  name,
  value,
  preselect,
  options,
  isExpanded,
  onToggle,
  onKeyDown,
  onBlur,
  onMouseOver,
  onClick,
  onClear,
  comboboxRef,
  children
}) => (
  <StyledSelectLayout>
    <Label id={id} isHidden={isLabelHidden} comboboxRef={comboboxRef}>
      {label}
    </Label>
    <Combobox
      id={id}
      name={name}
      isExpanded={isExpanded}
      onKeyDown={onKeyDown}
      onClick={onToggle}
      onBlur={onBlur}
      value={value}
      comboboxRef={comboboxRef}
    >
      <StyledComboboxText>{children}</StyledComboboxText>
      <ComboboxButton
        hasValue={value !== ''}
        isExpanded={isExpanded}
        onClick={onToggle}
        onClear={onClear}
      />
    </Combobox>
    <ListBox id={id} isExpanded={isExpanded}>
      {options.map((option, i) => (
        <Option
          key={option.value}
          id={`${id}-${option.value}`}
          isPreselected={preselect === i}
          isSelected={option.value === value}
          option={option}
          position={i}
          onMouseOver={onMouseOver}
          onClick={onClick}
        >
          {option.label}
        </Option>
      ))}
    </ListBox>
  </StyledSelectLayout>
);

const StyledSelectLayout = styled.div`
  display: grid;
  position: relative;
  color: white;
`;

const StyledComboboxText = styled(Text)`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  flex-grow: 1;
  min-width: 0;
`;
