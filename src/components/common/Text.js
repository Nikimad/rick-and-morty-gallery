import styled, { css } from 'styled-components';

export function Text({
  className,
  children,
  component,
  style,
  display,
  lineHeight,
  color,
  fontSize
}) {
  return (
    <StyledText
      as={component}
      className={className}
      style={style}
      _display={display}
      _color={color}
      _fontSize={fontSize}
      _lineHeight={lineHeight}
    >
      {children}
    </StyledText>
  );
}

const StyledText = styled.span`
  display: ${({ _display }) => _display};
  color: ${({ _color }) => _color};
  font-size: ${({ _fontSize }) => _fontSize};
  line-height: ${({ _lineHeight }) => _lineHeight};
  margin: ${css(({ as }) => as !== 'span' && 0)};
`;
