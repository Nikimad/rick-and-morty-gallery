import styled from 'styled-components';

export const Input = (props) => <StyledInput {...props} />;

const StyledInput = styled.input`
  font: inherit;
  color: #fff;
  background-color: #263750;
  border: 1px solid #83bf46;
  border: none;
  border-radius: 8px;
  border: 1px solid #83bf46;
  padding: 8px;
  transition: 0.3s;

  &:hover,
  &:focus-visible {
    background-color: #334466;
  }

  &::placeholder {
    color: #b3b3b3;
  }
`;
