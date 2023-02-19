const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

module.exports = {

  entry: {
    'main': path.resolve(__dirname, 'src/index.js'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,

        exclude: (file) => {
          return /node_modules/.test(file) && !/\.vue\.js/.test(file);
        },

        use: {
          loader: 'babel-loader',

          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            // Creates css file. Do not use together with style-loader
            loader: MiniCssExtractPlugin.loader,
          },

          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },

          {
            // resolve url() paths
            loader: 'resolve-url-loader',
            options: {
              debug: true,
              root: '/',
            },
          },

          {
            // Compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }
        ],
      }

      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'assets/img',
      //     },
      //   },
      // },

      // {
      //   // SVGs can be images or fonts
      //   test: /\.(svg)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: (url, resourcePath, context) => {

      //         if (/\\fonts\\|\/fonts\//.test(resourcePath)) {
      //           return `assets/fonts/${url}`;
      //         }

      //         if (/\\icons\\|\/icons\/|\\img\\|\/img\//.test(resourcePath)) {
      //           console.log('Found an image or icon: ', url);
      //           return `assets/img/${url}`;
      //         }

      //       },
      //     },
      //   },
      // },

      // {
      //   test: /\.(eot|ttf|woff|woff2)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'assets/fonts',
      //     },
      //   },
      // }

    ],
  },

  resolve: {
    alias: {
      // String template workaround https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
      'vue$': path.join(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js'),
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(
      {
        filename: '[name].css',
      }
    ),
    new CopyPlugin({
      patterns: [
        {
          // "Flat" copies html files
          from: 'src/**/*.html',
          to: '[name][ext]',
        }
      ],
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    })
  ],

};
