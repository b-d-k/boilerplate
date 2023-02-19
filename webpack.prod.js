const common = require('./webpack.common');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'production',

  watch: false,

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin()
    ],
  },
});
