const config = require('./webpack.config.base')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  }),
  new webpack.HotModuleReplacementPlugin()
])

module.exports = merge(config, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: '/dist/',
    host: '0.0.0.0',
    port: 8080,
    inline: true,
    hot: false,
    compress: true,
    watchContentBase: true
    // proxy: {
    //   '/api': {
    //     target: 'http://www.baidu.com',
    //     pathRewrite: { '^/api': '/api' } //重写路径
    //   }
    // }
  },
  output: {
    path: path.join(process.cwd(), '/dist'),
    filename: 'assets/js/[name].bundle.js'
  }
})
