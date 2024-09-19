const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ExcludeAssetsPlugin = require("webpack-exclude-assets-plugin");
let rootPath = path.resolve(__dirname, "..");
const corePath = rootPath;
const srcPath = corePath + "/src";
const distPath = corePath + "/dist";
const assetDistPath = distPath + "/assets";

const config = {
  mode: "development",
  entry: {
    "css/style.bundle": [
      "./" + path.relative("./", srcPath) + "/sass/style.scss",
    ],
    "js/scripts.bundle": "./webpack/scripts.demo1.js",
  },
  output: {
    path: assetDistPath,
    filename: "[name].js",
    publicPath:distPath
  },
  devServer: {
    static: {
      directory: distPath,
    },
    compress: true,
    port: 8080,
    hot: true,
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  // },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ExcludeAssetsPlugin({
      path: ["css/.*.js$"],
    }),
  ],
  // resolve: {
  //   alias: {
  //     "@": [rootPath, corePath],
  //   },
  //   extensions: [".js", ".css"],
  //   fallback: {
  //     util: false,
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
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
              // Prefer `dart-sass`
              implementation: require("sass"),
              sourceMap: false,
              sassOptions: {
                includePaths: [
                  corePath,
                  path.resolve(__dirname, "node_modules"),
                ],
              },
            },
          },
        ],
      },
    ],
  },
};

module.exports = config;
