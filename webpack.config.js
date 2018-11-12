const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    resolve(__dirname, 'src', 'index.jsx')
  ],
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [
            'react-hot-loader/babel',
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

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new MomentLocalesPlugin(),
    new HtmlWebpackPlugin({
      template:'template.ejs',
      appMountId: 'react-app-root',
      title: 'Wagsworth Grooming Co.',
      favicon: './src/assets/images/favicon.png',
      filename: resolve(__dirname, "dist", "index.html"),
    }),
  ],
  
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  devtool: '#source-map',

  output: {
    filename: 'app.bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};