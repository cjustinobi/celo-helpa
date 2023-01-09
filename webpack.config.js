const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: path.resolve(process.cwd(), 'src', 'main.js'),
    jobs: path.resolve(process.cwd(), 'src', 'jobs.js'),
    transactions: path.resolve(process.cwd(), 'src', 'transactions.js'),
  },
  output: {
    path: path.resolve(process.cwd(), 'docs'),
    publicPath: ''
  },
	node: {
   fs: 'empty',
	 net: 'empty'
	},
  watchOptions: {
    // ignored: /node_modules/,
    aggregateTimeout: 300, // After seeing an edit, wait .3 seconds to recompile
    poll: 500 // Check for edits every 5 seconds
  },
  stats: { children: false },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'public', 'index.html'),
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'public', 'my-jobs.html'),
      filename: 'my-jobs.html',
      chunks: ['jobs']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'public', 'my-transactions.html'),
      filename: 'my-transactions.html',
      chunks: ['transactions']
    })
  ]
}
