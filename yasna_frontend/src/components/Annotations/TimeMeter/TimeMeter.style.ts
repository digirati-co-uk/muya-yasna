import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${props => props.theme.colors.grey.lightGrey2};
  position: relative;
  left: 0;
  right: 0;
`;

type CursorProps = {
  position: number;
};

export const Cursor = styled.circle.attrs<CursorProps>(props => ({
  style: { transform: `translateX(${props.position}px)` },
}))<CursorProps>`
  fill: ${props => props.theme.colors.brand.orangeRed};
  transition: transform 0.6s linear;
`;
