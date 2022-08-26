import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Dropdown, DropdownProps } from './Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    onSelect: { action: 'selected' },
  },
} as Meta;

const Template: Story<DropdownProps> = args => <Dropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Ice cream',
  options: [
    { label: 'Chocolate', value: 'chocolate' },
    { label: 'Vanilla', value: 'vanilla' },
  ],
};
