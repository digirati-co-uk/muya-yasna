import styled from 'styled-components';
import { ControlsContainer } from './Controls/Controls.style';

export const Container = styled.div`
  width: auto;
  height: 100%;
  position: relative;
  display: grid;
  place-items: center;

  &:hover ${ControlsContainer} {
    opacity: 1;
  }
`;

export const Video = styled.video`
  width: 100%;
`;
