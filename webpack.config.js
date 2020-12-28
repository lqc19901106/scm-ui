const webpack = require('webpack');
// 导入非 webpack 自带默认插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const DashboardPlugin = require('webpack-dashboard/plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',
  entry: {
    app: './app/entry.tsx',
    common: ['react', 'react-dom', 'classnames'],
  },
  output: {
    
  },
  rules: [
    {
      test: /\.tsx?$/,
      include: [path.resolve(__dirname, 'packages'), path.resolve(__dirname, 'examples')],
      exclude: [path.resolve(__dirname, 'node_moudles')],
      use: 'ts-loader',
    },
    {
      test: /\.jsx?$/,
      include: [path.resolve(__dirname, 'examples'), path.resolve(__dirname, 'packages')],
      exclude: [path.resolve(__dirname, 'node_moudles')],
      use: 'babel-loader',
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        'sass-loader',
      ],
    },
    {
      test: /\.less/,
      use: [
        {
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        'less-loader',
      ],
      exclude: /node_modules/,
    },
    {
      test: /\.(bmp|gif|jpe?g|png)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            limit: 10 * 1024,
            name: '[name].[contenthash:8].[ext]',
            outputPath: 'assets/images',
          },
        },
      ],
    },
  ],
  plugins: [
    new CleanWebpackPlugin(),
    // 构建优化插件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common-[hash].min.js',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      cache: fale,
      minify: devMode
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
    // webpack-dev-server 强化插件
    // new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 3030,
    compress: true,
  },

  externals: [
    {
      lodash: {
        commonjs: 'lodash',
        amd: 'lodash',
        root: '_', // 指向全局变量
      },
    },
  ],
};
