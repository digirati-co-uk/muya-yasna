import { Story, Meta } from '@storybook/react';
import { Navigation } from './Navigation';
import { ReactQuery } from '../../decorators/ReactQuery';

export default {
  title: 'Components/Navigation',
  component: Navigation,
  decorators: [ReactQuery],
} as Meta;

const Template: Story = args => <Navigation {...args} />;

export const Primary = Template.bind({});
