module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-a11y',
  ],
  babel: async options => ({
    ...options,
    // any extra options you want to set
    plugins: [...options.plugins, 'babel-plugin-styled-components'],
  }),
};
