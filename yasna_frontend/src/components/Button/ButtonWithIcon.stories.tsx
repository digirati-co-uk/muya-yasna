import { Meta, Story } from '@storybook/react';
import { ReactComponent as AddIcon } from '../../icons/add1.svg';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Components/Button/With Icon',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = args => {
  return <Button {...args} />;
};

export const Enabled = Template.bind({});
Enabled.args = {
  children: (
    <>
      <AddIcon />
      Button
    </>
  ),
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: (
    <>
      <AddIcon />
      Disabled
    </>
  ),
  disabled: true,
};

export const Outlined = Template.bind({});
Outlined.args = {
  children: (
    <>
      <AddIcon />
      Button
    </>
  ),
  outline: true,
};

export const OutlinedDisabled = Template.bind({});
OutlinedDisabled.args = {
  children: (
    <>
      <AddIcon />
      Disabled
    </>
  ),
  outline: true,
  disabled: true,
};

export const Contained = Template.bind({});
Contained.args = {
  children: (
    <>
      <AddIcon />
      Button
    </>
  ),
  contained: true,
};

export const ContainedDisabled = Template.bind({});
ContainedDisabled.args = {
  children: (
    <>
      <AddIcon />
      Disabled
    </>
  ),
  contained: true,
  disabled: true,
};
