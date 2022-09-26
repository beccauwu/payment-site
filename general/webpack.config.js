const path = require("path");
const webpack = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");

module.exports = {
  context: __dirname,
  entry: "./lib/index.js",
  output: {
    path: path.resolve("./static/js"),
    filename: "main.js",
    devtoolModuleFilenameTemplate:
      "webpack://[namespace]/[resource-path]?[loaders]",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [new BundleTracker({ filename: "./webpack-stats.json" })],
  devtool: "eval-source-map",
};
