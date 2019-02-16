const config = require('./webpack.config.base')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const ClearWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new MiniCssExtractPlugin({
    filename: 'style.[contenthash:8].css'
  }),
  new ClearWebpackPlugin(['dist'], { root: path.resolve(__dirname, '../') })
])

module.exports = merge(config, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'initial',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3
    }
  },
  output: {
    path: path.join(process.cwd(), '/dist'),
    filename: './js/[name].[chunkhash].js'
  },
  devtool: false
})
