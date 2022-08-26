import {
  VideoPlayerContextType,
  VideoPlayerContext,
  initialContextState,
} from '../../context/VideoPlayerContext/VideoPlayerContext';
import { fireEvent, render, screen } from '../../testUtils';
import { PlaybackSpeedSlider } from './PlaybackSpeedSlider';

const renderComponent = (context: Partial<VideoPlayerContextType> = {}) =>
  render(
    <VideoPlayerContext.Provider value={{ ...initialContextState, ...context }}>
      <PlaybackSpeedSlider />
    </VideoPlayerContext.Provider>,
  );

describe('PlaybackSpeedSlider', () => {
  it('renders correctly', () => {
    renderComponent();
    expect(screen.getByRole('slider', { name: /playback speed/i })).toBeInTheDocument();
  });

  it('sets the video playback rate', () => {
    const videoPlayer = { setPlaybackRate: jest.fn() };
    renderComponent(videoPlayer);
    const event = { target: { value: 0.5 } };
    fireEvent.change(screen.getByRole('slider', { name: /playback speed/i }), event);
    expect(videoPlayer.setPlaybackRate).toBeCalledWith(0.5);
  });
});
