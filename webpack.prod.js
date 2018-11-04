const { resolve } = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  mode: "production",
  entry: [
    resolve(__dirname, 'src', 'index.jsx')
  ],
  plugins: [
    new MomentLocalesPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            'styled-jsx/babel',
            ['transform-remove-console', { 'exclude': [ 'error', 'warn'] }]
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
    path: resolve(__dirname, 'dist'),
    publicPath: 'https://www.eggborne.com/wagsworth/dist/',
    filename: 'app.bundle.js'
  }
};