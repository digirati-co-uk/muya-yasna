import styled from 'styled-components';

export const Thumb = styled.div`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  border: none;
  height: 11px;
  width: 11px;
  border-radius: 11px;
  background: ${props => props.theme.colors.brand.white};
  transition: transform 0.2s;
  transform: translateX(-50%);
  user-select: none;

  &:hover {
    cursor: pointer;
    transform: translateX(-50%) scale(1.2);
  }
`;
