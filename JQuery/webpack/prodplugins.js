const webpack = require('webpack')

/**
 * These plugins are used when webpack is in production mode
 */
const plugins = [
  // This plugin adds the production tag to the process environment
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  // This plugin minimizes the code
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  // This plugin does some optimization to the minimized code
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false
  })
]

module.exports = plugins
