import { Story, Meta } from '@storybook/react';
import { VideoPlayerContext } from '../../../context/VideoPlayerContext';
import { initialContextState } from '../../../context/VideoPlayerContext/VideoPlayerContext';
import { TimeMeter, TimeMeterProps } from './TimeMeter';

export default {
  title: 'Components/TimeMeter',
  component: TimeMeter,
  decorators: [
    (Story, { args }) => (
      <VideoPlayerContext.Provider value={{ ...initialContextState, currentTime: args.currentTime }}>
        <Story />
      </VideoPlayerContext.Provider>
    ),
  ],
  argTypes: {
    start: {
      control: { type: 'range' },
    },
    end: {
      control: { type: 'range' },
    },
    currentTime: {
      control: { type: 'range' },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<TimeMeterProps & { currentTime: number }> = args => <TimeMeter {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  start: 5,
  end: 13,
  currentTime: 12,
};
