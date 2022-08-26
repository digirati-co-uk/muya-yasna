import { rgba } from 'polished';
import styled from 'styled-components';
import { Button as ButtonFont } from '../../../theme/Typography';

export const Container = styled.div`
  position: relative;
  margin-bottom: 1em;
`;

const NavButton = styled.button`
  position: absolute;
  bottom: 1em;
  ${ButtonFont}
  height: 36px;
  width: 36px;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  background-color: ${props => props.theme.colors.brand.orangeRed};
  color: ${props => props.theme.colors.brand.white};
  border: none;
  box-shadow: ${props => props.theme.elevation['04dp']};
  transition: box-shadow 0.2s, transform 0.2s;

  &:disabled {
    background-color: ${props => rgba(props.theme.colors.brand.orangeRed, 0.4)};
    cursor: default;
  }

  &:hover:enabled {
    transform: scale(1.2);
    cursor: pointer;
    box-shadow: ${props => props.theme.elevation['08dp']};
  }

  &:active:enabled {
    transform: scale(0.8);
    box-shadow: ${props => props.theme.elevation['06dp']};
  }
`;

export const StyledButtonBack = styled(NavButton)`
  left: 1em;
`;

export const StyledButtonNext = styled(NavButton)`
  right: 1em;
`;
