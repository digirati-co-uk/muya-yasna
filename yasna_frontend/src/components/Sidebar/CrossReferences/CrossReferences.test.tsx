import { render, screen } from '../../../testUtils';
import { CrossReferences, CrossReferencesProps } from './CrossReferences';
import { YasnaObjectSummary } from '../../../typings/ObjectTracking';
import userEvent from '@testing-library/user-event';
import { SelectedObjectContext } from '../../../context/SelectedObjectContext';

const setSelectedObjectId = jest.fn();

const defaultProps: CrossReferencesProps = {
  list: [],
};

const renderComponent = (props: Partial<CrossReferencesProps> = {}) =>
  render(
    <SelectedObjectContext.Provider value={{ selectedObjectId: 0, setSelectedObjectId }}>
      <CrossReferences {...defaultProps} {...props} />
    </SelectedObjectContext.Provider>,
  );

describe('CrossReferences', () => {
  it('renders nothing when list is empty', () => {
    renderComponent();
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });

  it('renders a list of cross references', () => {
    const list: YasnaObjectSummary[] = [
      { id: 0, label: 'Cat' },
      { id: 1, label: 'Dog' },
    ];
    renderComponent({ list });
    expect(screen.getByText('Cat')).toBeInTheDocument();
    expect(screen.getByText('Dog')).toBeInTheDocument();
  });

  it('selects an object when it is clicked in the list', () => {
    const list: YasnaObjectSummary[] = [
      { id: 0, label: 'Cat' },
      { id: 1, label: 'Dog' },
    ];
    renderComponent({ list });
    userEvent.click(screen.getByText('Cat'));
    expect(setSelectedObjectId).toBeCalledWith(0);
  });
});
