const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const config = require("./webpack.config.base");
const UglifyJs = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const CopyWebpackPlugin = require("copy-webpack-plugin");

const GLOBALS = {
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "false"))
};

module.exports = merge(config, {
  devtool: "nosources-source-map",
  entry: {
    application: ["src/js/index"],
    vendor: [
      "@webcomponents/webcomponentsjs/custom-elements-es5-adapter",
      "unfetch"
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "../src/assets"),
        to: "assets"
      },
      {
        from: path.join(__dirname, "../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"),
        to: "."
      },
      {
        from: path.join(__dirname, "../node_modules/@webcomponents/webcomponentsjs/webcomponents-hi-ce.js"),
        to: "."
      },
      {
        from: path.join(__dirname, "../node_modules/@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce.js"),
        to: "."
      },
      {
        from: path.join(__dirname, "../node_modules/@webcomponents/webcomponentsjs/webcomponents-hi.js"),
        to: "."
      },
      {
        from: path.join(__dirname, "../node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js"),
        to: "."
      },
      {
        from: path.join(__dirname, "../node_modules/@webcomponents/webcomponentsjs/webcomponents-sd-ce.js"),
        to: "."
      }
    ]),
    // Avoid publishing files when compilation fails
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new OptimizeJsPlugin({
      sourceMap: false,
    }),
    new UglifyJs()
  ],
  module: {
    noParse: /\.min\.js$/
  }
});
