const path = require.resolve('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode : 'development',
  entry: {
    index: './src/index.js',
    login: './src/login.js',
    complited: "./src/complited.js",
    active: "./src/active.js",
    all: "./src/all.js",
    api_delete: "./src/api/delete.js",
    api_get: "./src/api/get.js",
    api_patch: "./src/api/patch.js",
    api_post: "./src/api/post.js",
    api_token: "./src/api/token.js",
    utils: './src/utils/utils.js',
  },

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: './src/pages/index.html',
      chunks: ['index'],
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPlugin({
      filename: "login.html",
      template: './src/pages/login.html',
      chunks: ['login'],
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPlugin({
      filename: "all.html",
      template: './src/pages/all.html',
      chunks: ['all'],
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPlugin({
      filename: "complited.html",
      template: './src/pages/complited.html',
      chunks: ['complited'],
      minify: {
        collapseWhitespace: isProd
      }
    }),

    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
    },
    ]
  }
}