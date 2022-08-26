import { render, screen } from '../../testUtils';
import { AnnotationDisplay, AnnotationDisplayProps } from './AnnotationDisplay';

const defaultProps: AnnotationDisplayProps = {
  Chapter: 'Y.0',
  Ritual_Part: 'Yasna',
  Stanza_Ref: 'Y.0.3',
  Stanza_SubDiv: 'Y.0.3.4',
};

const renderComponent = (props: Partial<AnnotationDisplayProps> = {}) =>
  render(<AnnotationDisplay {...defaultProps} {...props} />);

describe('AnnotationDisplay', () => {
  it('renders correctly with only chapter & verse data', () => {
    renderComponent();
    expect(screen.queryByText(/^english$/i)).not.toBeInTheDocument();
  });

  it('shows the stanza text, language and English translation', () => {
    renderComponent({
      Stanza_OTxt: 'The greatest teacher, failure is.',
      Stanza_TrTxt: 'Failure is the greatest teacher.',
      Stanza_Lang: 'Yoda',
    });

    expect(screen.getByText('Yoda')).toBeInTheDocument();
    expect(screen.getByText('The greatest teacher, failure is.')).toBeInTheDocument();
    expect(screen.getByText(/^english$/i)).toBeInTheDocument();
    expect(screen.getByText('Failure is the greatest teacher.')).toBeInTheDocument();
  });

  it('shows the ritual action in English', () => {
    renderComponent({
      RA_Description: 'Something happens in the ritual.',
    });

    expect(screen.getByText(/ritual action \(english\)/i)).toBeInTheDocument();
    expect(screen.getByText('Something happens in the ritual.')).toBeInTheDocument();
  });

  it('shows the ritual action in Gujarati', () => {
    renderComponent({
      RA_Guj: 'Something else happens in the ritual.',
    });

    expect(screen.getByText(/ritual action \(gujarati\)/i)).toBeInTheDocument();
    expect(screen.getByText('Something else happens in the ritual.')).toBeInTheDocument();
  });

  it('shows the ritual action in Middle Persian', () => {
    renderComponent({
      RA_MP: 'And another thing happens in the ritual.',
    });

    expect(screen.getByText(/ritual action \(middle persian\)/i)).toBeInTheDocument();
    expect(screen.getByText('And another thing happens in the ritual.')).toBeInTheDocument();
  });
});
