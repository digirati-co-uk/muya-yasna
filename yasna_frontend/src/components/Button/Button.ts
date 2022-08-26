import styled, { css } from 'styled-components';
import { rgba, lighten } from 'polished';
import { Button as ButtonFont } from '../../theme/Typography';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  (
    | {
        outline: true;
        contained?: false;
      }
    | {
        outline?: false;
        contained: true;
      }
  );

const Common = css`
  ${ButtonFont}
  height: 36px;
  padding: 0 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  color: ${props => props.theme.colors.brand.orangeRed};
  background: transparent;
  border-radius: 4px;
  border: none;
  box-shadow: ${props => props.theme.elevation['00dp']};
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;

  &:hover {
    box-shadow: ${props => props.theme.elevation['04dp']};
    background-color: ${props => rgba(props.theme.colors.brand.orangeRed, 0.12)};
  }

  &:active {
    box-shadow: ${props => props.theme.elevation['02dp']};
    background: transparent;
  }

  &:disabled {
    box-shadow: ${props => props.theme.elevation['00dp']};
    background: transparent;
    color: ${props => rgba(props.theme.colors.brand.black, 0.38)};

    &:hover {
      box-shadow: ${props => props.theme.elevation['00dp']};
      background: transparent;
      color: ${props => rgba(props.theme.colors.brand.black, 0.38)};
    }
  }
`;

const Outlined = css`
  border: 1px solid ${props => rgba(props.theme.colors.brand.black, 0.12)};
  box-shadow: ${props => props.theme.elevation['01dp']};

  &:hover {
    border: 1px solid ${props => rgba(props.theme.colors.brand.darkOrangeRed, 0.12)};
  }

  &:disabled:hover {
    border: 1px solid ${props => rgba(props.theme.colors.brand.black, 0.12)};
  }
`;

const Contained = css`
  color: ${props => props.theme.colors.brand.white};
  background: ${props => props.theme.colors.brand.orangeRed};
  box-shadow: ${props => props.theme.elevation['01dp']};

  &:hover {
    background: ${props => lighten(0.1, props.theme.colors.brand.orangeRed)};
  }

  &:active {
    background: ${props => lighten(0.2, props.theme.colors.brand.orangeRed)};
  }
`;

export const Button = styled.button<ButtonProps>`
  ${Common}
  ${props => props.outline && Outlined}
  ${props => props.contained && Contained}
`;
