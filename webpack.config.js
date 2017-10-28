/* global __dirname, module, require */

const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devServer: {
    host: 'localhost',
    inline: true,
    port: 3000,
  },
  devtool: 'source-map',
  entry: path.join(__dirname, 'src/index.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.png$/,
        use: 'url-loader',
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new HtmlPlugin({ title: 'Gamejam!' }),
    new webpack.ProvidePlugin({
      'PIXI': path.join(__dirname, '/node_modules/phaser/build/custom/pixi.js'),
      'Phaser': path.join(__dirname, '/node_modules/phaser/build/custom/phaser-split.js'),
      'p2': path.join(__dirname, '/node_modules/phaser/build/custom/p2.js'),
    }),
  ],
}
