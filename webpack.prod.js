const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  mode: "production",
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

  devtool: '',

  plugins: [
    new MomentLocalesPlugin(),
    new HtmlWebpackPlugin({
      template:'template.ejs',
      appMountId: 'react-app-root',
      title: 'Wagsworth Grooming Co.',
      filename: resolve(__dirname, "./", "index.html"),
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: 'https://www.eggborne.com/wagsworth/dist/',
    filename: 'app.bundle.js'
  }
};