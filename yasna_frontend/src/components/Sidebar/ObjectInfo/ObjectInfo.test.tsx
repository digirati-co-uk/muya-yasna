import { render, screen } from '../../../testUtils';
import { ObjectInfo } from './ObjectInfo';
import { YasnaObject } from '../../../typings/ObjectTracking';

const mockObject: YasnaObject = {
  label: 'LABEL',
  name_in_avestan: 'NAME_IN_AVESTAN',
  name_in_middle_persian: 'NAME_IN_MIDDLE_PERSIAN',
  name_in_gujarati: 'NAME_IN_GUJARATI',
  url: 'URL',
  id: 0,
  cross_references: [],
  translation: 'TRANSLATION',
  definition: 'DEFINITION',
  description_of_action: 'DESCRIPTION_OF_ACTION',
  function: 'FUNCTION',
  where_during_ritual: 'WHERE_DURING_RITUAL',
  interpretation: 'INTERPRETATION',
  references: 'REFERENCES',
  comments: 'COMMENTS',
  object_images: [],
};

const renderComponent = (props: Partial<YasnaObject> = {}) => render(<ObjectInfo {...mockObject} {...props} />);

describe('ObjectInfo', () => {
  it('renders the label text correctly', () => {
    renderComponent();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'LABEL',
    );
  });

  it('renders the label text correctly when a language is missing', () => {
    renderComponent({
      label: 'LABEL',
      name_in_avestan: 'NAME_IN_AVESTAN',
      name_in_middle_persian: '',
      name_in_gujarati: 'NAME_IN_GUJARATI',
    });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('LABEL');
  });
});
