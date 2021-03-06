const config = require('./webpack.config.base')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const ClearWebpackPlugin = require('clean-webpack-plugin')

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new ClearWebpackPlugin(['dist'], { root: path.resolve(__dirname, '../') })
])

module.exports = merge(config, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    path: path.join(process.cwd(), '/dist'),
    filename: 'assets/js/[name].[chunkhash].js'
  },
  devtool: false
})
