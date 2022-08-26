import { render, screen } from '../../testUtils';
import { Annotations, AnnotationsProps } from './Annotations';

const defaultProps: AnnotationsProps = {};

const renderComponent = (props: AnnotationsProps = {}) => render(<Annotations {...defaultProps} {...props} />);

describe('Annotations', () => {
  it('renders a loading state', () => {
    renderComponent();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
