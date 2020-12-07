var path = require("path");
var webpack = require("webpack");
// doesn't work with es6
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// deprecated
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    js: "./index.js",
  },
  output: { path: __dirname + "/assets", filename: "bundle.js" },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            // fallback: "style-loader",
            // use: ["css-loader", "sass-loader"],
            loader: "css-loader",
            // options: {
            //   modules: true,
            //   sourceMap: true,
            //   importLoader: 2,
            // },
          },
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    // new ExtractTextPlugin({
    //   filename: "app.css",
    //   allChunks: true,
    // }),
    new MiniCssExtractPlugin({
      filename: "app.css",
      chunkFilename: "[name].css",
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
};
