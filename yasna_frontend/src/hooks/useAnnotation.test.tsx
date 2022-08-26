import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAnnotation } from './useAnnotation';
import mockAnnotationsData from '../mocks/annotations.json';
import { VideoPlayerContext } from '../context/VideoPlayerContext';
import { initialContextState } from '../context/VideoPlayerContext/VideoPlayerContext';

const queryClient = new QueryClient();

const wrapper = (currentTime: number): React.FC => ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <VideoPlayerContext.Provider value={{ ...initialContextState, currentTime }}>
        {children}
      </VideoPlayerContext.Provider>
    </QueryClientProvider>
  );
};

describe('useAnnotation', () => {
  it('returns the annotation at start', async () => {
    const { result, waitFor } = renderHook(() => useAnnotation(), { wrapper: wrapper(0.0) });
    await waitFor(() => !result.current.isLoading);
    expect(result.current.currentAnnotation).toEqual(mockAnnotationsData.annotation_sets[0]);
  });

  it('returns the annotation for the current time', async () => {
    const { result, waitFor } = renderHook(() => useAnnotation(), { wrapper: wrapper(2.1) });
    await waitFor(() => !result.current.isLoading);
    expect(result.current.currentAnnotation).toEqual(mockAnnotationsData.annotation_sets[1]);
  });
});
