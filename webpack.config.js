const { resolve } = require('path');

module.exports = {
  mode: 'development',
  entry: [
    resolve(__dirname, 'src', 'index.jsx')
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            'styled-jsx/babel'
          ]
        }
      },
      {
        test: /\.(png|gif|jp(e*)g|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'images/[hash]-[name].[ext]'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'app.bundle.js'
  },
  devServer: {
    contentBase: resolve(__dirname, './'),
    publicPath: '/'
  }
};