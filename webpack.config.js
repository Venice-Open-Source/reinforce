const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     filename: './index.html'
  //   })
  // ],
  devServer: {
    historyApiFallback: true,
    contentBase: './client',
    publicPath: '/build/',
    hot: true,
    proxy: {
      '/addCard': 'http://localhost:3000', 
      '/login': 'http://localhost:3000',
      '/createUser': 'http://localhost:3000',
      secure: false
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
}