import styled from 'styled-components';
import { MenuButton, MenuItem, MenuPopover } from '@reach/menu-button';
import { Position } from '@reach/popover';

export const Button = styled(MenuButton)`
  width: 100%;
  margin: 0 auto;
  padding: 0.5em 1em;
  background: ${props => props.theme.colors.brand.darkOrangeRed};
  border: none;
  font-family: 'Work Sans';
  font-weight: bold;
  color: ${props => props.theme.colors.brand.white};
  text-align: left;
  cursor: pointer;
`;

const aboveButton: Position = (targetRect, popoverRect) => {
  if (!targetRect || !popoverRect) {
    return {};
  }

  if (popoverRect.height > (window.innerHeight * 2) / 3) {
    return {
      left: `calc(${targetRect.left}px + 1em)`,
      top: '1em',
      maxHeight: `calc(100vh - 2em)`,
      overflowY: 'scroll',
    };
  }

  return {
    left: `${targetRect.left + window.pageXOffset}px`,
    bottom: `${window.innerHeight - targetRect.top}px`,
  };
};

export const Popover = styled(MenuPopover).attrs({ position: aboveButton })`
  z-index: 20;
  box-shadow: ${props => props.theme.elevation['16dp']};
`;

export const ItemsContainer = styled.div`
  background-color: ${props => props.theme.colors.brand.white};
  color: ${props => props.theme.colors.brand.darkOrangeRed};
`;

export const Item = styled(MenuItem)`
  &[data-selected] {
    background-color: ${props => props.theme.colors.brand.orangeRed};
  }
`;
