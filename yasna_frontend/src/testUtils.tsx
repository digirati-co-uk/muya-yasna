import { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { VideoPlayerProvider } from './context/VideoPlayerContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const AllTheProviders: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <VideoPlayerProvider>{children}</VideoPlayerProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
