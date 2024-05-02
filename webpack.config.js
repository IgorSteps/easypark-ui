import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';
const env = process.env.NODE_ENV;

export default [
  {
    name: 'backend',
    entry: './src/index.js',
    mode: 'development',
    output: {
      path: path.resolve('dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new DotenvWebpackPlugin({
        path: `./.env.backend`,
      }),
    ],
    devServer: {
      static: './dist',
      port: 9000,
      historyApiFallback: true,
    }
  },
  {
    name: 'mirage',
    entry: './src/index.js',
    mode: 'development',
    output: {
      path: path.resolve('dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new DotenvWebpackPlugin({
        path: `./.env.mirage`,
      }),
    ],
    devServer: {
      static: './dist',
      port: 9000,
      historyApiFallback: true,
    }
  }
];
