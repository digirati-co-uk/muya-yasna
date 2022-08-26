import styled from 'styled-components';

type ContentProps = {
  maxHeight?: number;
};

export const Content = styled.section<ContentProps>`
  background-color: ${props => props.theme.colors.brand.white};
  height: 100%;
  max-height: ${props => (props.maxHeight ? `${props.maxHeight}px` : '100%')};
  min-width: 20em;
  overflow-y: scroll;

  & pre {
    white-space: pre-wrap;
  }
`;

export const Placeholder = styled.div`
  max-width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

export const InfoContainer = styled.div`
  background: #ffffff;
  margin: 1em;
  padding: 2em;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

export const Label = styled.h1`
  font-family: 'Work Sans';
  font-weight: 700;
  font-size: 16px;
  line-height: 120%;
  margin: 0;
`;

export const Translation = styled.h2`
  font-family: 'Work Sans';
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  margin: 0;
`;

export const SectionTitle = styled.h3`
  font-family: 'Work Sans';
  font-weight: 500;
  font-size: 12px;
  line-height: 19px;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0;
`;

export const Text = styled.p`
  font-size: 14px;
  line-height: 160%;
  color: ${props => props.theme.colors.grey.darkGrey1};
`;
