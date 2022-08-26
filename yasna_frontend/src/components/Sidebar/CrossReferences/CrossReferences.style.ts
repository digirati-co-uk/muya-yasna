import styled from 'styled-components';

export const ButtonAsLink = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.colors.brand.darkOrangeRed};
  text-decoration: underline;

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.colors.brand.orangeRed};
    text-decoration: none;
  }
`;
