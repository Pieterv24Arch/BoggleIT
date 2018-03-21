const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

/**
 * The file baseplugins contains the webpack plugins that should be loaded regardless of if the app is in production or in development
 */
const plugins = [
  // This plugin adds the correct script references to index.ejs and outputs it as index.html
  new HTMLWebpackPlugin({
    template: `${path.join(__dirname, '../public')}/index.ejs`,
    inject: true
  }),
  // This plugin seperates your code and the code in node_modules
  // This in order to minimize the total of changed files on recompilation
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      // this assumes your vendor imports exist in the node_modules directory
      return module.context && module.context.indexOf('node_modules') !== -1
    },
    filename: 'vendor.bundle.js'
  })
]

module.exports = plugins
