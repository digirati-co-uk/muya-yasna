import { rgba } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;
  inset: 0;
  display: flex;
`;

export const Bar = styled.progress`
  width: 100%;
  height: 3px;
  --webkit-appearance: none;
  --moz-appearance: none;
  appearance: none;
  border: none;
  background-color: ${props => rgba(props.theme.colors.brand.white, 0.2)};

  &:hover {
    cursor: pointer;
  }

  &::-webkit-progress-bar {
    background-color: ${props => rgba(props.theme.colors.brand.white, 0.2)};
    border-radius: 3px;
  }

  &::-webkit-progress-value {
    background-color: ${props => props.theme.colors.brand.white};
  }

  &::-moz-progress-bar {
    background-color: ${props => props.theme.colors.brand.white};
  }
`;
