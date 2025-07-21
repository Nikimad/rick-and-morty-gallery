import styled, { css } from 'styled-components';

export const Text = ({
  className,
  children,
  component,
  style,
  color,
  fontSize,
  ...props
}) => (
  <StyledText
    as={component}
    className={className}
    style={style}
    _color={color}
    _fontSize={fontSize}
    {...props}
  >
    {children}
  </StyledText>
);

const StyledText = styled.span`
  color: ${({ _color }) => _color};
  font-size: ${({ _fontSize }) => _fontSize};
  margin: ${css(({ as }) => as !== 'span' && 0)};
`;
