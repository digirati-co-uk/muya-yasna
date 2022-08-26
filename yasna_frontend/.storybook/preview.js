import { ThemeProvider } from 'styled-components';
import { addDecorator } from '@storybook/react';
import { initializeWorker, mswDecorator } from 'msw-storybook-addon';
import { theme } from '../src/theme';
import Typography from '../src/theme/Typography';
import { handlers } from '../src/mocks/handlers';

initializeWorker();
addDecorator(mswDecorator);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  msw: handlers,
};

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <Typography />
      <Story />
    </ThemeProvider>
  ),
];
