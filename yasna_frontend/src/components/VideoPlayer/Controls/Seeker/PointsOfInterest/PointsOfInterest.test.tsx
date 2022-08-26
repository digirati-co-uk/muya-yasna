import { render, screen } from '../../../../../testUtils';
import mockNavigationData from '../../../../../mocks/navigation_data.json';
import { PointsOfInterest } from './PointsOfInterest';
import { VideoPlayerContext } from '../../../../../context/VideoPlayerContext';
import { initialContextState } from '../../../../../context/VideoPlayerContext/VideoPlayerContext';
import userEvent from '@testing-library/user-event';

const seekTo = jest.fn();

const renderComponent = () =>
  render(
    <VideoPlayerContext.Provider value={{ ...initialContextState, seekTo }}>
      <PointsOfInterest />
    </VideoPlayerContext.Provider>,
  );

describe('PointsOfInterest', () => {
  it('renders a point of interest for each chapter', async () => {
    const chapterCount = mockNavigationData.reduce((count, section) => count + section.contains.length, 0);
    renderComponent();
    expect(await screen.findAllByTestId('point-of-interest')).toHaveLength(chapterCount);
  });

  it("seeks to the point's time when clicked", async () => {
    const yasna_1 = mockNavigationData[1].contains[1];
    renderComponent();
    userEvent.click(await screen.findByText(yasna_1.label));
    expect(seekTo).toBeCalledWith(yasna_1.seconds);
  });
});
