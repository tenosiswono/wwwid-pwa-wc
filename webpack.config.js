
const path = require("path")

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
