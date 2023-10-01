const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const optimization = () => {
  const config = {
      splitChunks: {
          chunks: 'all'
      }
  }
  if (isProd) {
      config.minimizer = [
          new TerserWebpackPlugin()
      ]
  }

  return config
}

module.exports = {
  mode: 'development',
  devServer: {
    port: 1000,
    hot : isDev,
  },
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

  optimization : optimization(),

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
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
  }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test : /\.css$/,
        use : [MiniCssExtractPlugin.loader,'css-loader']
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },

    ]
  }
}