const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('config');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});
const configWebpack = new webpack.DefinePlugin({ config: JSON.stringify(config) });

module.exports = {
  entry: './src/index.jsx',
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    port: 3001,
    open: true,
    proxy: {
      '/api': 'http://localhost:3000/',
    },
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.sass$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(png|jpg|svg)$/,
      loader: 'file-loader',
    },
    ],
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
  },
  plugins: [htmlWebpackPlugin, configWebpack],
};
