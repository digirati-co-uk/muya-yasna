import { render, screen } from '../../testUtils';
import userEvent from '@testing-library/user-event';
import { VideoPlayer } from './VideoPlayer';

const playStub = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(async () => {});
const pauseStub = jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(async () => {});

const renderComponent = () => render(<VideoPlayer />);

describe('VideoPlayer', () => {
  afterAll(() => {
    playStub.mockRestore();
    pauseStub.mockRestore();
  });

  it('displays a video player', () => {
    renderComponent();
    expect(screen.getByTestId('video')).toBeInTheDocument();
  });

  it('shows an overlay when paused', () => {
    renderComponent();
    expect(screen.queryByRole('region', { name: 'objects' })).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /play/i }));
    expect(screen.queryByRole('region', { name: 'objects' })).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(screen.queryByRole('region', { name: 'objects' })).toBeInTheDocument();
  });
});
