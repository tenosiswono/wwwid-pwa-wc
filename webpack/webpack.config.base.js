// Common Webpack configuration used by webpack.config.development and webpack.config.production

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "../build"),
    publicPath: "/"
  },
  resolve: {
    modules: ["node_modules", "src"],
    alias: {
      src: path.join(__dirname, "../src")
    },
    extensions: [".js", ".json", ".scss"]
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
    // Shared code
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js",
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      inject: false
    })
  ],
  module: {
    rules: [
      // JavaScript / ES6
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          babelrc: false,
          cacheDirectory: true,
          presets: [require.resolve("./babel/preset")]
        }
      },
      //HTML
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, "../src/client")],
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      // Images
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "images/[name].[ext]?[hash]"
          }
        }
      }
    ]
  }
};
