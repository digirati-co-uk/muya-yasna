import { render, screen } from '../../../testUtils';
import userEvent from '@testing-library/user-event';
import { Dropdown, DropdownProps } from './Dropdown';

const defaultProps: DropdownProps = {
  placeholder: 'PLACEHOLDER',
  options: [],
  onSelect: () => null,
};

const renderComponent = (props: Partial<DropdownProps> = {}) => render(<Dropdown {...defaultProps} {...props} />);

describe.skip('Dropdown', () => {
  it('shows the placeholder text', () => {
    renderComponent();
    expect(screen.getByText(defaultProps.placeholder)).toBeInTheDocument();
  });

  it('shows the options once the menu is opened', () => {
    const options = [
      { label: 'Chocolate', value: 'chocolate' },
      { label: 'Vanilla', value: 'vanilla' },
    ];
    renderComponent({ options });
    expect(screen.queryByText(/chocolate/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(defaultProps.placeholder));
    expect(screen.getByText('Chocolate')).toBeInTheDocument();
  });

  it('selects an option by clicking', () => {
    const options = [
      { label: 'Chocolate', value: 'chocolate' },
      { label: 'Vanilla', value: 'vanilla' },
    ];
    const onSelect = jest.fn();
    renderComponent({ options, onSelect });
    userEvent.click(screen.getByText(defaultProps.placeholder));
    userEvent.click(screen.getByText('Chocolate'));
    expect(onSelect).toBeCalledWith('chocolate');
  });

  it('closes the menu and sets the displayed text to the selected item', () => {
    const options = [
      { label: 'Chocolate', value: 'chocolate' },
      { label: 'Vanilla', value: 'vanilla' },
    ];
    renderComponent({ options });
    userEvent.click(screen.getByText(defaultProps.placeholder));
    userEvent.click(screen.getByText('Vanilla'));
    expect(screen.queryByText(/chocolate/i)).not.toBeInTheDocument();
    expect(screen.queryByText(defaultProps.placeholder)).not.toBeInTheDocument();
    expect(screen.getByText('Vanilla')).toBeInTheDocument();
  });

  it('works with numeric values', () => {
    const options = [
      { label: 'Ten', value: 10 },
      { label: 'Twenty', value: 20 },
    ];
    const onSelect = jest.fn();
    renderComponent({ options, onSelect });
    userEvent.click(screen.getByText(defaultProps.placeholder));
    userEvent.click(screen.getByText('Twenty'));
    expect(onSelect).toBeCalledWith(20);
    expect(screen.queryByText(/ten/i)).not.toBeInTheDocument();
    expect(screen.getByText('Twenty')).toBeInTheDocument();
  });

  it('closes when outside element is clicked', () => {
    const options = [
      { label: 'Chocolate', value: 'chocolate' },
      { label: 'Vanilla', value: 'vanilla' },
    ];
    render(
      <>
        <Dropdown {...defaultProps} options={options} />
        <div data-testid="outside" />
      </>,
    );
    userEvent.click(screen.getByText(defaultProps.placeholder));
    expect(screen.getByText('Chocolate')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('outside'));
    expect(screen.queryByText('Chocolate')).not.toBeInTheDocument();
  });
});
