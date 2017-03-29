const path = require('path')
const webpack = require('webpack')

const buildPath = path.resolve(__dirname, 'build')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')

module.exports = {
  // Create SourceMaps for the bundle
  devtool: 'source-map',
  // Server Configuration options
  devServer: {
    contentBase: './public/', // location for HTML,and Relative directory for base of server
    devtool: 'eval',
    hot: true, // Live-reload
    inline: true,
    port: 3000, // Port Number
    host: 'localhost', // Change to '0.0.0.0' for external facing server
  },
  entry: [
    // Set up an ES6-ish environment
    'babel-polyfill',
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: [nodeModulesPath],
    }, {
      test: /\.css$/,
      loader: 'style!css',
    }],
  },
  plugins: [
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
  ],
  stats: {
    // Nice colored output
    colors: true,
  },
}

// module.exports = config;
