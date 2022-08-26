import { render, screen } from '../../testUtils';
import { Plot, PlotProps } from './Plot';

const defaultProps: PlotProps = {};

const renderComponent = (props: Partial<PlotProps> = {}) => render(<Plot {...defaultProps} {...props} />);

describe('Plot', () => {
  it('renders correctly without objects', () => {
    renderComponent();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders correctly when objects list is empty', () => {
    renderComponent({ objects: [] });
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders an action button for each object with a box', () => {
    const objects = [
      {
        x_centre: 10,
        y_centre: 10,
        height: 20,
        width: 20,
        yasnaobject: { id: 1, label: 'Object 1' },
      },
      {
        x_centre: 15,
        y_centre: 15,
        height: 20,
        width: 40,
        yasnaobject: { id: 2, label: 'Object 2' },
      },
    ];
    renderComponent({ objects });
    expect(screen.getAllByRole('button')).toHaveLength(objects.length);
    expect(screen.getByRole('button', { name: 'Object 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Object 2' })).toBeInTheDocument();
  });
});
