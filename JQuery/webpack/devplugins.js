const webpack = require('webpack')

/**
 * These plugins are only used when webpack is in development mode
 */
const plugins = [
  // This plugin allows hot reloading of js files
  new webpack.HotModuleReplacementPlugin(),
  // This plugin simplifies debugging by adding the correct js file to the debugging console
  new webpack.NamedModulesPlugin()
]

module.exports = plugins
