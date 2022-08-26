import styled, { css } from 'styled-components';
import { Caption } from '../../theme/Typography';

export const Container = styled.div`
  max-width: 20em;
  margin: 1em;
`;

export const TickList = styled.ol`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

type TickProps = {
  isSelected: boolean;
};

export const Tick = styled.li<TickProps>`
  ${Caption}
  list-style-type: none;
  display: inline;
  color: ${props => (props.isSelected ? props.theme.colors.secondary.information : props.theme.colors.brand.charcoal)};
`;

const Thumb = css`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  border: none;
  height: 17px;
  width: 17px;
  border-radius: 17px;
  background: linear-gradient(136.64deg, #fc6f42 20.27%, #cd4d25 75%);
  cursor: pointer;
`;

const Track = css`
  width: 100%;
  height: 7px;
  cursor: pointer;
  background: #e3346e;
  border-radius: 7px;
  border: none;
`;

export const Slider = styled.input`
  width: 100%;
  background: transparent;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    margin-top: -5px;
    ${Thumb}
  }

  &::-moz-range-thumb {
    ${Thumb}
  }

  &::-ms-thumb {
    ${Thumb}
  }

  &::-webkit-slider-runnable-track {
    ${Track}
  }

  &::-moz-range-track {
    ${Track}
  }

  &::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-ms-fill-lower,
  &::-ms-fill-upper {
    ${Track}
  }
`;
