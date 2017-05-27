/**
 * Copyright (c) 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var fs = require('fs-extra')
var path = require('path')
var webpack = require('webpack')
var readline = require('readline')

var variables = {
  __DEV__ : false,
  __HOST__: JSON.stringify(''),
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
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
    filename: STATIC_ROOT + '/[name].[hash].js',
    chunkFilename: STATIC_ROOT + '/[id].[hash].js',
    publicPath: '/'
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

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),

    new plugins.WriteIndex(settings)
  ]
}

module.exports = new Promise(function(resolve) {
  var output = (process.argv.slice(2).find(function(arg) {
    return !arg.indexOf('--output-path=')
  }) || '').split('=')[1] || ''

  if (!output || output == './') {
    return resolve(config)
  }

  settings.target = output

  if (!fs.existsSync(output)) {
    return resolve(config)
  }

  if (!fs.statSync(output).isDirectory()) {
    console.error(` 该目录下已存在名为 '${ path.basename(output) }' 的文件!\n`)
    process.exit(0)
  }

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  var attemps = 3

  function confirm(msg, fn) {
    if (!attemps) {
      return rl.close()
    }
    rl.question(msg, function(answer) {
      if (answer.trim().length) {
        rl.close()
        fn(/^y/i.test(answer))
      } else {
        attemps--
        confirm(msg, fn)
      }
    })
  }

  confirm('目标目录已存在，是否覆盖？[y/n] ', function(ok) {
    if (ok) {
      resolve(config)
      fs.removeSync(path.join(output, STATIC_ROOT))
    } else {
      process.exit(0)
    }
  })
})
