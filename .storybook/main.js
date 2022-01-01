const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "~": path.resolve(__dirname, "../src"),
      },
    };
    return config;
  },
  babel: async (options) => ({
    ...options,
    presets: [...options.presets, "@emotion/babel-preset-css-prop"],
  }),
};
