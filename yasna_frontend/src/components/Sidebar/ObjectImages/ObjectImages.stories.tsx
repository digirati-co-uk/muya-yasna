import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ObjectImages, ObjectImagesProps } from './ObjectImages';

export default {
  title: 'ObjectImage',
  component: ObjectImages,
  decorators: [
    Story => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<ObjectImagesProps> = args => <ObjectImages {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  images: [
    {
      image:
        'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80',
    },
  ],
};
