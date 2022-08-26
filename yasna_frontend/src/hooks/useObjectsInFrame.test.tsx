import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useObjectsInFrame } from './useObjectsInFrame';

const queryClient = new QueryClient();

const wrapper: React.FC = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('useObjectsInFrame', () => {
  it('fetches the data for the objects in frame', async () => {
    const { result, waitFor } = renderHook(() => useObjectsInFrame(123), { wrapper });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toHaveLength(6);
  });
});
