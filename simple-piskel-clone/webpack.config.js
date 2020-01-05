const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /('node_modules')/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader'],
          },
        ),
      },
      {
        test: /\.(eot|gif|otf|png|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/images',
        },
      },
      {
        test: /\.svg$/,
        use: {
            loader: 'svg-url-loader',
            options: {
                encoding: 'base64'
            }
        }
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
    new ExtractTextPlugin({ filename: 'style.css' }),
    new HtmlWebpackPlugin({ filename: 'index.html',
    }),
    
  ],
};
