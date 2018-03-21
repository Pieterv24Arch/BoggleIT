const path = require('path')

const modules = require('./modules')
const basePlugins = require('./baseplugins')

module.exports = {
  context: path.join(__dirname, '../js'),
  entry: {
    js: 'main'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[hash].[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, '../js'),
      'node_modules'
    ]
  },
  module: modules,
  plugins: basePlugins
}
