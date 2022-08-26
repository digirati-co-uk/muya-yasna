import { render, screen } from '../../testUtils';
import { SelectedObjectContext, SelectedObjectProvider } from './SelectedObjectContext';
import { useContext } from 'react';
import userEvent from '@testing-library/user-event';

function DummyComponent() {
  const { selectedObjectId, setSelectedObjectId } = useContext(SelectedObjectContext);

  if (!selectedObjectId) {
    return (
      <>
        <span data-testid="result">No object selected!</span>
        <button onClick={() => setSelectedObjectId(138)}>Select object 138</button>
      </>
    );
  }

  return <span data-testid="result">Selected object: {selectedObjectId}</span>;
}

const renderComponent = () =>
  render(
    <SelectedObjectProvider>
      <DummyComponent />
    </SelectedObjectProvider>,
  );

describe('SelectedObjectContext', () => {
  it('holds null by default', () => {
    renderComponent();
    expect(screen.getByTestId('result')).toHaveTextContent('No object selected!');
  });

  it('holds a selected object id', () => {
    renderComponent();
    userEvent.click(screen.getByRole('button', { name: 'Select object 138' }));
    expect(screen.getByTestId('result')).toHaveTextContent('Selected object: 138');
  });
});
