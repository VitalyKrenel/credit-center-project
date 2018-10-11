const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({ mode = 'development' } = {}) => {
  
  const entry = {
    index: './src/index.js',
  };

  const htmlLoaders = {
    test: /\.pug$/,
    use: [
      { 
        loader: 'pug-loader', 
        options: {
          pretty: true,
        },
      },
    ],
  };

  const cssLoaders = {
    test: /\.scss$/,
    use: [
      (mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'),
      { 
        loader: 'css-loader', 
        options: {
          sourceMap: true,
          importLoaders: 1,
          url: false,
        }
      },
      { 
        loader: 'sass-loader',
        options: { 
          sourceMap: true
        }
      },
    ],
  };

  const plugins = [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
    }),
    new CopyWebpackPlugin([{
      from: './src/img/',
      to: './img/'
    }]),
  ];

  const devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9099,
  };

  return {
    entry,
    mode,
    devtool: mode === 'production' ? 'source-map' : 'eval',
    module: {
      rules: [
        cssLoaders,
        htmlLoaders,
      ],
    },
    plugins,
    devServer,
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    }
  }
}
