const path = require("path");
module.exports = {
  stories: ["../stories/*.stories.tsx"],
  addons: ["storybook-readme/register", "@storybook/addon-actions"],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.less$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.md$/,
      loader: ["markdown-loader"],
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader"),
          options: {
            configFile: path.resolve(__dirname, "./tsconfig.json"),
          },
        },
        // Optional
        {
          loader: require.resolve("react-docgen-typescript-loader"),
        },
      ],
    });

    config.resolve.extensions.push(".ts", ".tsx", ".md");

    return config;
  },
};
