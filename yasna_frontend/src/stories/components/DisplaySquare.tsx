import styled from 'styled-components';

type DisplaySquareProps = {
  color: string;
  name: string;
  shadow?: string;
};

type SquareProps = Omit<DisplaySquareProps, 'name'>;

const Square = styled.div<SquareProps>`
  height: 160px;
  width: 160px;
  background-color: ${props => props.color};
  box-shadow: ${props => props.shadow || 'none'};
`;

export function DisplaySquare({ color, name, shadow }: DisplaySquareProps) {
  return (
    <div>
      <Square color={color} shadow={shadow} />
      <pre>{name}</pre>
    </div>
  );
}
