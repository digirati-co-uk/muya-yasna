import styled from 'styled-components';

type DisplayRectangleProps = {
  color: string;
  name: string;
  shadow?: string;
  hover?: string;
  active?: string;
};

type RectangleProps = Omit<DisplayRectangleProps, 'name'>;

const Rectangle = styled.div<RectangleProps>`
  height: 100px;
  width: 100%;
  background-color: ${props => props.color};
  box-shadow: ${props => props.shadow || 'none'};
  transition: box-shadow 0.2s;

  &:hover {
    cursor: ${props => (props.hover ? 'pointer' : 'auto')};
    box-shadow: ${props => props.hover || props.shadow || 'none'};
  }

  &:active {
    cursor: ${props => (props.active ? 'pointer' : 'auto')};
    box-shadow: ${props => props.active || props.shadow || 'none'};
  }
`;

export function DisplayRectangle({ name, ...displayProps }: DisplayRectangleProps) {
  return (
    <div>
      <Rectangle {...displayProps} />
      <pre>{name}</pre>
    </div>
  );
}
