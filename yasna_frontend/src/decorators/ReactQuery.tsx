import { DecoratorFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export const ReactQuery: DecoratorFn = story => (
  <QueryClientProvider client={queryClient}>
    {story()}
    <ReactQueryDevtools />
  </QueryClientProvider>
);
