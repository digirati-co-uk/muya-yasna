import { createGlobalStyle, css } from 'styled-components';

const HeadlineFont = css`
  font-family: 'Work Sans', sans-serif;
`;

const BodyFont = css`
  font-family: Roboto, sans-serif;
`;

export const Headline1 = css`
  ${HeadlineFont}
  font-style: normal;
  font-weight: 300;
  font-size: 96px;
  line-height: 112px;
  letter-spacing: -1.5px;
`;

export const Headline2 = css`
  ${HeadlineFont}
  font-style: normal;
  font-weight: 300;
  font-size: 60px;
  line-height: 72px;
  letter-spacing: -0.5px;
`;

export const Headline3 = css`
  ${HeadlineFont}
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 56px;
`;

export const Headline4 = css`
  ${HeadlineFont}
  font-style: normal;
  font-weight: normal;
  font-size: 34px;
  line-height: 36px;
`;

export const Headline5 = css`
  ${HeadlineFont}
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.18px;
`;

export const Headline6 = css`
  ${HeadlineFont}
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.15px;
`;

export const Subtitle1 = css`
  ${BodyFont}
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
`;

export const Subtitle2 = css`
  ${BodyFont}
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.1px;
`;

export const Body = css`
  ${BodyFont}
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
`;

export const BodySmall = css`
  ${BodyFont}
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
`;

export const Button = css`
  ${BodyFont}
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 1.25px;
  text-transform: uppercase;
`;

export const Caption = css`
  ${BodyFont}
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.4px;
`;

export const Overline = css`
  ${BodyFont}
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

export default createGlobalStyle`
  h1 { 
    ${Headline1} 
  }

  h2 {
    ${Headline2}
  }

  h3 {
    ${Headline3}
  }

  h4 {
    ${Headline4}
  }

  h5 {
    ${Headline5}
  }

  h6 {
    ${Headline6}
  }

  body {
    ${Body}
  }
`;
