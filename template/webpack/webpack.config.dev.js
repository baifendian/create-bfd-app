/**
 * Copyright (c) 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var path = require('path')
var webpack = require('webpack')

var variables = {
  __DEV__ : true,
  __HOST__: JSON.stringify('')
}

var STATIC_ROOT = 'static'

var settings = {
  target: './',
  static: STATIC_ROOT,
  dev: variables.__DEV__
}

var plugins = require('./include/plugins')
var alias = require('./include/alias')
var rules = require('./include/rules')(settings)

var config = {
  entry: {
		app: './index.js'
  },
  output: {
    path: path.resolve('./'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/' + STATIC_ROOT + '/'
  },
  module: {
    rules: rules
  },
  resolve: {
    extensions: ['.js'],
    alias: alias
  },

  plugins: [
    new webpack.DefinePlugin(variables),

    new plugins.LiveReloadPlugin({
      appendScriptTag: true
    }),

    new plugins.WriteIndex(settings)
  ]
}

module.exports = config
