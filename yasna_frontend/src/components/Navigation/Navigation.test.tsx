import userEvent from '@testing-library/user-event';
import { VideoPlayerContext } from '../../context/VideoPlayerContext';
import { initialContextState, VideoPlayerContextType } from '../../context/VideoPlayerContext/VideoPlayerContext';
import { render, screen } from '../../testUtils';
import { Navigation } from './Navigation';

const renderComponent = (context: Partial<VideoPlayerContextType> = {}) =>
  render(
    <VideoPlayerContext.Provider value={{ ...initialContextState, ...context }}>
      <Navigation />
    </VideoPlayerContext.Provider>,
  );

describe('Navigation', () => {
  it('renders correctly', async () => {
    renderComponent();
    expect(screen.getByText(/chapter/i)).toBeInTheDocument();
    expect(screen.getByText(/subsection/i)).toBeInTheDocument();
  });

  it.skip('seeks to the selected timeframe', async () => {
    const videoPlayer = { seekTo: jest.fn() };
    renderComponent(videoPlayer);
    userEvent.click(screen.getByText(/chapter/i));
    userEvent.click(await screen.findByText('Y.0'));
    userEvent.click(screen.getByText(/subsection/i));
    userEvent.click(await screen.findByText('Y.0.0.2'));
    expect(videoPlayer.seekTo).toBeCalledWith(3627.742);
  });

  it.skip('can seek to the start of the video', async () => {
    const videoPlayer = { seekTo: jest.fn() };
    renderComponent(videoPlayer);
    userEvent.click(screen.getByText(/chapter/i));
    userEvent.click(await screen.findByText(/^Par.0/i));
    userEvent.click(screen.getByText(/subsection/i));
    userEvent.click(await screen.findByText('Par.0.1.1'));
    expect(videoPlayer.seekTo).toBeCalledWith(0);
  });
});
