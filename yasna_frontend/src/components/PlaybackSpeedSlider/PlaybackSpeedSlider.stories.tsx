import { Story, Meta } from '@storybook/react';
import { PlaybackSpeedSlider } from './PlaybackSpeedSlider';

export default {
  title: 'Components/PlaybackSpeedSlider',
  component: PlaybackSpeedSlider,
  argTypes: { onChange: { action: 'changed' } },
} as Meta;

const Template: Story = args => <PlaybackSpeedSlider {...args} />;

export const Primary = Template.bind({});
