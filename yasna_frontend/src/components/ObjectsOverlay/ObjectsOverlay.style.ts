import styled from 'styled-components';

export const OverlayContainer = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
`;

export type OverlayProps = {
  height: number;
  width: number;
};

export const Overlay = styled.section<OverlayProps>`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: transparent;
  color: ${props => props.theme.colors.brand.white};
  display: grid;
  place-items: center;
  user-select: none;
  overflow: auto;
`;

export const ObjectPlotContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: none;

  & > * {
    pointer-events: initial;
  }
`;

type ObjectBoxProps = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export const ObjectBox = styled.div<ObjectBoxProps>`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  display: grid;
  place-items: center;
  overflow: visible;
  border: 2px solid transparent;
  border-radius: 4px;
  pointer-events: none;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${props => props.theme.colors.brand.darkOrangeRed};
  }

  & > * {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    pointer-events: initial;
    z-index: 20;
  }
`;
