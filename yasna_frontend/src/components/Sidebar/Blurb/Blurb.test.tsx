import { render, screen } from '../../../testUtils';
import { Blurb, BlurbProps } from './Blurb';

const renderComponent = (props: Partial<BlurbProps> = {}) => render(<Blurb {...props} />);

describe('Blurb', () => {
  it('renders nothing when no text is present', () => {
    renderComponent({ title: 'Blurb' });
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });

  it('renders nothing when text is empty', () => {
    renderComponent({ title: 'Blurb', text: '' });
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });

  it('renders a heading and text when text is present', () => {
    renderComponent({ title: 'Blurb', text: 'This is some text.' });
    expect(screen.getByRole('heading')).toHaveTextContent('Blurb');
    expect(screen.getByText('This is some text.')).toBeInTheDocument();
  });

  it('renders no heading when only text is present', () => {
    renderComponent({ text: 'This is some text.' });
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByText('This is some text.')).toBeInTheDocument();
  });
});
