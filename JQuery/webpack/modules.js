/**
 * This file specifies how certian files should be handled by webpack
 */
const myModules = {
  rules: [{
    test: /\.html$/,
    use: {
      loader: 'file-loader',
      query: {
        name: '[name].[ext]'
      }
    }
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      {
        // This loader compiles our es6+ code back to regular javascript so each browser can run it(mostly... im looking at you IE)
        loader: 'babel-loader',
        query: {
          presets: [
            require.resolve('babel-preset-env'),
            require.resolve('babel-preset-stage-1')
          ],
          plugins: [
            require.resolve('babel-plugin-transform-runtime')
          ],
          cacheDirectory: true
        }
      },
      // This loader makes sure your code conforms to the js standard
      'eslint-loader'
    ]
  }
  ]
}

module.exports = myModules
