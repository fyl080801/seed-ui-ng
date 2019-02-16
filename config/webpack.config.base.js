const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: /src/
      },
      {
        test: /\.html$/,
        use: 'text-loader',
        include: /src/
      },
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)(\?.*)?$/,
        use: 'url-loader'
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
}
