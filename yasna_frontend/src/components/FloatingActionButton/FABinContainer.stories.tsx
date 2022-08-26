import { Meta, Story } from '@storybook/react';
import styled from 'styled-components';
import { FloatingActionButton, FloatingActionButtonProps } from './FloatingActionButton';
import {
  Normal as NormalStory,
  Dark as DarkStory,
  Mini as MiniStory,
  MiniDark as MiniDarkStory,
  Extended as ExtendedStory,
  ExtendedDark as ExtendedDarkStory,
} from './FloatingActionButton.stories';

const Container = styled.div<{ width: number; height: number }>`
  position: relative;
  border: 1px solid #cccccc;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  overflow: hidden;
`;

const containerProps = { width: 640, height: 380 };

export default {
  title: 'Components/Floating Action Button (FAB)/in Container',
  component: FloatingActionButton,
  decorators: [s => <Container {...containerProps}>{s()}</Container>],
  argTypes: {
    children: { table: { disable: true } },
    x: { type: 'number', control: { type: 'range', min: 0, max: containerProps.width, step: 1 } },
    y: { type: 'number', control: { type: 'range', min: 0, max: containerProps.height, step: 1 } },
  },
} as Meta;

const Template: Story<FloatingActionButtonProps> = args => {
  return <FloatingActionButton {...args} />;
};

function withCoords(args?: Partial<FloatingActionButtonProps>) {
  return { ...args, x: containerProps.width / 2, y: containerProps.height / 2 };
}

export const Normal = Template.bind({});
Normal.args = withCoords(NormalStory.args);

export const Dark = Template.bind({});
Dark.args = withCoords(DarkStory.args);

export const Mini = Template.bind({});
Mini.args = withCoords(MiniStory.args);

export const MiniDark = Template.bind({});
MiniDark.args = withCoords(MiniDarkStory.args);

export const Extended = Template.bind({});
Extended.args = withCoords(ExtendedStory.args);

export const ExtendedDark = Template.bind({});
ExtendedDark.args = withCoords(ExtendedDarkStory.args);
