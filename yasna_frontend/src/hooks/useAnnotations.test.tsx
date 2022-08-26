import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAnnotations } from './useAnnotations';
import mockAnnotationsData from '../mocks/annotations.json';

const queryClient = new QueryClient();

const wrapper: React.FC = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('useAnnotations', () => {
  it('fetches the annotations for the current time', async () => {
    const { result, waitFor } = renderHook(() => useAnnotations(123), { wrapper });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual(mockAnnotationsData);
  });
});
