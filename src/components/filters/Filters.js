import { useCallback, useReducer } from 'react';

import styled from 'styled-components';

import { useAppState } from '../../hooks/useAppState';
import { INIT_APP_STATE } from '../../constants';

import { Select } from '../select';
import { Input } from '../input';

const statusOptions = [
  { value: '', label: 'Status' },
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' }
];

const genderOptions = [
  { value: '', label: 'Gender' },
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' }
];

const speciesOptions = [
  { value: '', label: 'Species' },
  { value: 'Alien', label: 'Alien' },
  { value: 'Animal', label: 'Animal' },
  { value: 'Cronenberg', label: 'Cronenberg' },
  { value: 'Disease', label: 'Disease' },
  { value: 'Human', label: 'Human' },
  { value: 'Humanoid', label: 'Humanoid' },
  { value: 'Mythological Creature', label: 'Mythological Creature' },
  { value: 'Poopybutthole', label: 'Poopybutthole' },
  { value: 'Robot', label: 'Robot' },
  { value: 'unknown', label: 'unknown' }
];

const ACTIONS = {
  SET_VALUE: 'setValue',
  RESET: 'reset'
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_VALUE:
      return {
        ...state,
        [action.name]: action.value
      };
    case ACTIONS.RESET:
      return INIT_APP_STATE;
    default:
      return state;
  }
};

export const FiltersForm = () => {
  const { state, changeState, resetState } = useAppState();
  const [filters, dispatchFilters] = useReducer(filterReducer, state);

  const handleChange = (name) => (value) => {
    dispatchFilters({ type: ACTIONS.SET_VALUE, name, value });
  };

  const handleChangeText = (name) => (e) => {
    handleChange(name)(e.target.value);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      changeState({ ...filters, page: 0 });
    },
    [filters, changeState]
  );

  const handleReset = useCallback(() => {
    resetState();
    dispatchFilters({ type: ACTIONS.RESET });
  }, [resetState]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Select
        label="Status"
        isLabelHidden={true}
        id="status"
        name="status"
        value={filters.status}
        setValue={handleChange('status')}
        options={statusOptions}
      />
      <Select
        label="Gender"
        isLabelHidden={true}
        id="gender"
        name="gender"
        value={filters.gender}
        setValue={handleChange('gender')}
        options={genderOptions}
      />
      <Select
        label="Species"
        isLabelHidden={true}
        id="species"
        name="species"
        value={filters.species}
        setValue={handleChange('species')}
        options={speciesOptions}
      />
      <Input
        label="Name"
        id="name"
        name="name"
        value={filters.name}
        onChange={handleChangeText('name')}
        placeholder="Name"
      />
      <Input
        label="Type"
        id="type"
        name="type"
        value={filters.type}
        onChange={handleChangeText('type')}
        placeholder="Type"
      />
      <ButtonWrapper>
        <ApplyButton type="submit">Apply</ApplyButton>
        <ResetButton type="reset" onClick={handleReset}>
          Reset
        </ResetButton>
      </ButtonWrapper>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 33%);
  grid-template-rows: min-content min-content;
  gap: 16px;
  justify-content: center;

  @media (max-width: 930px) {
    width: 80%;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  background-color: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #fff;
  }
`;

const ApplyButton = styled(StyledButton)`
  color: #83bf46;
  border: 1px solid #83bf46;

  &:hover {
    background-color: #83bf46;
  }
`;

const ResetButton = styled(StyledButton)`
  color: #ff4d4d;
  border: 1px solid #ff4d4d;

  &:hover {
    background-color: #ff4d4d;
  }
`;
