const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExcludeAssetsPlugin = require("webpack-exclude-assets-plugin");

module.exports = {
  mode: "development",
  entry: {
    "js/scripts.bundle": "./src/index.js",
    "css/style.bundle": "./src/sass/style.scss",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  stats: {
    loggingDebug: ["sass-loader"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sourceMap: false,
              sassOptions: {
                includePaths: [
                  __dirname,
                  path.resolve(__dirname, "node_modules"),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ExcludeAssetsPlugin({
      path: ["css/.*.js$"],
    }),
  ],
};
