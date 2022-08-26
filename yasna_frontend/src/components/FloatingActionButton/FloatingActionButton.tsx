import { lighten, rgba } from 'polished';
import styled, { css } from 'styled-components';
import { Button as ButtonFont } from '../../theme/Typography';

export type FloatingActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  mini?: boolean;
  dark?: boolean;
};

const Common = css`
  ${ButtonFont}
  height: 42px;
  min-width: 42px;
  border-radius: 21px;
  padding: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  background-color: ${props => rgba(props.theme.colors.brand.orangeRed, 0.6)};
  color: ${props => props.theme.colors.brand.white};
  border: none;
  box-shadow: ${props => props.theme.elevation['04dp']};
  transition: box-shadow 0.2s, background-color 0.2s;

  &:hover {
    background-color: ${props => rgba(props.theme.colors.brand.orangeRed, 0.8)};
    cursor: pointer;
    box-shadow: ${props => props.theme.elevation['08dp']};
  }

  &:active {
    background-color: ${props => lighten(0.2, props.theme.colors.brand.orangeYellow)};
    box-shadow: ${props => props.theme.elevation['06dp']};
  }
`;

const Mini = css`
  height: 30px;
  min-width: 30px;
  border-radius: 15px;
  padding: 0;
`;

const Dark = css`
  background-color: ${props => props.theme.colors.brand.charcoal};

  &:hover {
    background-color: ${props => lighten(0.1, props.theme.colors.brand.charcoal)};
  }

  &:active {
    background-color: ${props => lighten(0.2, props.theme.colors.brand.charcoal)};
  }
`;

export const FloatingActionButton = styled.button<FloatingActionButtonProps>`
  ${Common}
  ${props => props.mini && Mini}
  ${props => props.dark && Dark}
`;
