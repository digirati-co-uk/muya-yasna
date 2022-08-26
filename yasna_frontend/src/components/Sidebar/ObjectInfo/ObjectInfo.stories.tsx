import { Story, Meta } from '@storybook/react';
import { ObjectInfo, ObjectInfoProps } from './ObjectInfo';
import mockObjectData from '../../../mocks/object.json';

export default {
  title: 'Components/ObjectInfo',
  component: ObjectInfo,
} as Meta;

const Template: Story<ObjectInfoProps> = args => <ObjectInfo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  ...mockObjectData,
  label: 'Kitten',
  name_in_avestan: 'le chat',
  name_in_middle_persian: 'el gato',
  translation: 'a young cat',
  definition: 'The cat (<i>Felis catus</i>) is a domestic species of small carnivorous mammal.',
  description_of_action: '',
  interpretation: '',
  where_during_ritual: 'The cat moves around a lot, unless it is sleeping.',
  function: 'The cat looks cute, and provides companionship in exchange for treats.',
  comments: 'Cats are awesome.',
  references: '<i>The Oxford English Dictionary</i>. Oxford University Press. Retrieved 1 October 2012.',
  object_images: [{ image: 'https://placekitten.com/640/480' }],
  cross_references: [
    { id: 138, label: 'Dog' },
    { id: 82, label: 'Mouse' },
  ],
};
