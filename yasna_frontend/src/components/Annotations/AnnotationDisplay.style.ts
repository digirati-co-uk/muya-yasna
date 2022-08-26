import styled, { css } from 'styled-components';

type DetailProps = {
  isRitualAction: boolean;
};

export const Container = styled.div`
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 1em;
`;

const colorForRitualAction = css<DetailProps>`
  color: ${props =>
    props.isRitualAction ? props.theme.colors.brand.darkOrangeRed : props.theme.colors.brand.charcoal};
`;

export const Label = styled.span<DetailProps>`
  font-weight: bold;
  ${colorForRitualAction}
`;

export const Text = styled.span<DetailProps>`
  ${colorForRitualAction}
`;
