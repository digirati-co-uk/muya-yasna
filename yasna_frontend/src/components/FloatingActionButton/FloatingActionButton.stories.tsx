import { Meta, Story } from '@storybook/react';
import { ReactComponent as AddIcon } from '../../icons/add1.svg';
import { FloatingActionButton, FloatingActionButtonProps } from './FloatingActionButton';

export default {
  title: 'Components/Floating Action Button (FAB)',
  component: FloatingActionButton,
} as Meta;

const Template: Story<FloatingActionButtonProps> = args => {
  return <FloatingActionButton {...args} />;
};

const position = { x: 48, y: 48 };

export const Normal = Template.bind({});
Normal.args = { children: <AddIcon />, ...position };

export const Dark = Template.bind({});
Dark.args = { children: <AddIcon />, dark: true, ...position };

export const Mini = Template.bind({});
Mini.args = { children: <AddIcon />, mini: true, ...position };

export const MiniDark = Template.bind({});
MiniDark.args = { children: <AddIcon />, mini: true, dark: true, ...position };

export const Extended = Template.bind({});
Extended.args = {
  children: (
    <>
      <AddIcon />
      Create
    </>
  ),
  ...position,
};

export const ExtendedDark = Template.bind({});
ExtendedDark.args = {
  children: (
    <>
      <AddIcon />
      Create
    </>
  ),
  dark: true,
  ...position,
};
