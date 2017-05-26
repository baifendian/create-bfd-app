/**
 * Copyright (c) 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

var plugins = require('./include/plugins')
var rules = require('./include/rules')
var alias = require('./include/alias')

var STATIC_ROOT = 'static'
var STATIC_PATH = path.resolve(STATIC_ROOT)

var variables = {
  __DEV__ : true,
  __HOST__: JSON.stringify('')
}

var config = {
  entry: {
		app: './index.js'
  },
  output: {
    path: STATIC_PATH,
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

    new plugins.WriteIndex({
      target: '.',
      root: STATIC_ROOT,
      dev: variables.__DEV__
    })
  ]
}

module.exports = config;
