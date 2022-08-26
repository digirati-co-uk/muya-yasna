import { rgba } from 'polished';
import styled from 'styled-components';

export const List = styled.div`
  height: 100%;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const Label = styled.div`
  background-color: ${props => props.theme.colors.brand.darkOrangeRed};
  color: ${props => props.theme.colors.brand.white};
  text-align: center;
  font-size: 0.75rem;
  border-radius: 7px;
  position: absolute;
  width: 4rem;
  height: 2rem;
  top: -40px;
  left: 50%;
  margin-left: -2rem;
  display: none;
`;

export const Dot = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 8px;
  position: relative;
  background: ${props => props.theme.colors.brand.orangeRed};
  border: 1px solid ${props => props.theme.colors.brand.darkOrangeRed};
  transform: translateX(-50%);
  transition: transform 0.2s;
  pointer-events: initial;

  &:hover {
    transform: translateX(-50%) scale(1.5);
    cursor: pointer;
    box-shadow: 0px 0px 0px 5px ${props => rgba(props.theme.colors.brand.orangeRed, 0.3)};
  }

  &:hover ${Label} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
