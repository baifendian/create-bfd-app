/**
 * Copyright (c) 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var rimraf = require('rimraf')
var autoprefixer = require('autoprefixer')
var LiveReloadPlugin = require('webpack-livereload-plugin')

var option = process.argv.slice(2)
var isProduction = option[0] === '-p'
var STATIC = 'static'

// 删除打包生成的静态资源目录，防止开发模式下优先读取硬盘以及多次打包后该目录下文件的累积
rimraf.sync('./' + STATIC)

var config = {
  entry: {
    app: './index.js'
  },
  output: {
    path: path.join(__dirname, STATIC),
    filename: '[name]' + (isProduction ? '.[hash]' : '') + '.js',
    chunkFilename: '[id]' + (isProduction ? '.[hash]' : '') + '.js',
    publicPath: '/' + STATIC + '/'
  },
  module: {
    noParse: [],
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ["es2015", "stage-0", "react"],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)(\?v=[\d\.]+)?$/,
      loader: 'file?name=files/[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.less$/,
      loader: 'style!css!less!postcss'
    }]
  },
  postcss: [autoprefixer({
    browsers: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 9', // React doesn't support IE8 anyway
    ]
  })],
  resolve: {
    extensions: ['', '.js'],
    alias: {
      public: path.join(__dirname, './public'),
      bfd: 'bfd-ui/lib'
    }
  },
  plugins: [new webpack.DefinePlugin({
    __DEV__: String(!isProduction)
  })]
}

if (isProduction) {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }))
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }))
} else {
  config.plugins.push(new LiveReloadPlugin({
    appendScriptTag: true
  }))
}

// 动态替换 index.html 入口 js src 地址
config.plugins.push(function() {
  this.plugin('done', function(statsData) {
    var stats = statsData.toJson()
    var html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
    var distPath = config.output.publicPath + 'app.' + (isProduction ? stats.hash : '') + 'js'
    html = html.replace(/(<script src=").*?(")/, '$1' + distPath + '$2')
    fs.writeFileSync(path.join(__dirname, 'index.html'), html)
  })
})

module.exports = config