
const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: {
    main: './src/js/index.js'
  },
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "./build"),
    publicPath: "/"
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      inject: false,
      minify: {
        minifyCSS: true,
        removeComments: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyJS: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, "./src"),
        loader: "babel-loader",
        options: {
          babelrc: false,
          cacheDirectory: true,
          presets: [require.resolve("./.babelrc.js")]
        }
      },
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, "./src/js/components")],
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  }
};
