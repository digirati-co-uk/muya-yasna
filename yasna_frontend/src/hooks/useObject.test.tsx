import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useObject } from './useObject';
import mockObjectData from '../mocks/object.json';

const queryClient = new QueryClient();

const wrapper: React.FC = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('useObject', () => {
  it('fetches the object data', async () => {
    const { result, waitFor } = renderHook(() => useObject(123), { wrapper });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual(mockObjectData);
  });

  it("doesn't fetch anything when no object is selected", async () => {
    const { result, waitFor } = renderHook(() => useObject(null), { wrapper });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toBeNull();
  });

  it('fetches the data for object with ID 0', async () => {
    const { result, waitFor } = renderHook(() => useObject(0), { wrapper });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).not.toBeNull();
  });
});
