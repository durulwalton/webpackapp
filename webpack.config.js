const path = require("path");
const autoprefixer = require('autoprefixer');
module.exports = {
  mode: "development",
  entry: {
    "js/scripts.bundle": "./src/js/index.js",
    "css/style.bundle": "./src/sass/talha/style.scss",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
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
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 9000,
    compress: true,
    hot: true,
  },
};