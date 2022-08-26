import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

export const NavPanel = styled.nav`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.colors.grey.lightGrey2};
`;

export const AnnotationsContainer = styled.section`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.colors.brand.white};
  overflow-y: scroll;
`;
