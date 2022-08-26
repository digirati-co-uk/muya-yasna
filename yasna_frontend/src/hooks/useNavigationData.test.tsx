import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useNavigationData } from './useNavigationData';
import mockNavigationData from '../mocks/navigation_data.json';
import { server } from '../mocks/server';
import { rest } from 'msw';
import endpoints from '../api/endpoints';

const queryClient = new QueryClient();

const wrapper: React.FC = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('useNavigation', () => {
  it('fetches the navigation data', async () => {
    server.use(
      rest.get(endpoints.navigation, (_, res, ctx) => {
        res(ctx.json(mockNavigationData));
      }),
    );
    const { result, waitFor } = renderHook(() => useNavigationData(), { wrapper });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual(mockNavigationData);
  });
});
