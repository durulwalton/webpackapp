const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
    "js/scripts.bundle": "./webpack/scripts.js",
    "css/style.bundle": [
      "./" + path.relative("./", srcPath) + "/sass/style.scss",
      "./" + path.relative("./", srcPath) + "/sass/style.css",
    ],
  },
  output: {
    path: assetDistPath,
    filename: "[name].js",
  },
  // webpack dev server config
  devServer: {
    static: {
      directory: distPath,
    },
    compress: true,
    port: 8080,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ExcludeAssetsPlugin({
      path: ["\/.*\.js$"],
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};

module.exports = config;
