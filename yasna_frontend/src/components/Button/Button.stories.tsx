import { Meta, Story } from '@storybook/react';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = args => {
  return <Button {...args} />;
};

export const Enabled = Template.bind({});
Enabled.args = { children: 'Button' };

export const Disabled = Template.bind({});
Disabled.args = { children: 'Disabled', disabled: true };

export const Outlined = Template.bind({});
Outlined.args = { children: 'Button', outline: true };

export const OutlinedDisabled = Template.bind({});
OutlinedDisabled.args = { children: 'Disabled', outline: true, disabled: true };

export const Contained = Template.bind({});
Contained.args = { children: 'Button', contained: true };

export const ContainedDisabled = Template.bind({});
ContainedDisabled.args = { children: 'Disabled', contained: true, disabled: true };
