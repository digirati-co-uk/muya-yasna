import { render, screen } from '../../../testUtils';
import { TimeDisplay, TimeDisplayProps } from './TimeDisplay';
import { displayTime } from '../../../util/formatTime';

const renderComponent = (props: TimeDisplayProps) => render(<TimeDisplay {...props} />);

describe('TimeDisplay', () => {
  it('renders correctly', () => {
    const currentTime = 263;
    const duration = 7932;
    renderComponent({ currentTime, duration });
    expect(screen.getByRole('timer')).toHaveTextContent(displayTime(currentTime));
    expect(screen.getByRole('timer')).toHaveTextContent(displayTime(duration));
  });
});
