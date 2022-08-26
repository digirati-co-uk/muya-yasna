import userEvent from '@testing-library/user-event';
import { VideoPlayerContext } from '../../../../../context/VideoPlayerContext';
import { initialContextState } from '../../../../../context/VideoPlayerContext/VideoPlayerContext';
import { render, screen } from '../../../../../testUtils';
import { Progress } from './Progress';

const seekTo = jest.fn();

const renderComponent = () =>
  render(
    <VideoPlayerContext.Provider value={{ ...initialContextState, seekTo }}>
      <Progress />
    </VideoPlayerContext.Provider>,
  );

describe('Progress', () => {
  it('renders correctly', () => {
    renderComponent();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('seeks to a time when clicked', () => {
    renderComponent();
    userEvent.click(screen.getByRole('progressbar'));
    expect(seekTo).toBeCalled();
  });
});
