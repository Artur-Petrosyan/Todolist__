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
  },

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },

  optimization : optimization(),

  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: './src/index.html',
      chunks: ['index'],
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