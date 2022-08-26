import styled, { css } from 'styled-components';

export const ControlsContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  background-image: linear-gradient(transparent, 95%, black);
  opacity: 1;
  transition: opacity 0.2s;
  pointer-events: none;
  padding: 0;
  & > * {
    pointer-events: initial;
  }

  @media only screen and (min-width: 720px) {
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  }
`;

export const ControlBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1em;
  gap: 1em;
`;

const ControlsCommon = css`
  background-color: transparent;
  color: ${props => props.theme.colors.brand.white};
`;

export const ControlButton = styled.button`
  ${ControlsCommon}
  font-size: 2em;
  border: none;
  transition: color 0.2s, scale 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.colors.brand.orangeRed};
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const TimeDisplayControl = styled.div`
  ${ControlsCommon}
  flex-shrink: 0;
`;
