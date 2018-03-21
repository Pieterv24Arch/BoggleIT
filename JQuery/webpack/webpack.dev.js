const merge = require('webpack-merge')

const common = require('./webpack.common')
const devPlugins = require('./devplugins')

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['styles/style.scss']
            }
          }
        ]
      }
    ]
  },
  plugins: devPlugins,
  devServer: {
    contentBase: './js',
    historyApiFallback: true,
    port: '3000',
    hot: true,
    compress: false,
    stats: { colors: true },
    host: '0.0.0.0',
    https: false
  }
})
