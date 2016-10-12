/**
 * Copyright (c) 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var express = require('express')
var path = require('path')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')

var app = express()

app.use(express.static(__dirname))

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/static/',
  stats: {
    colors: true
  }
}))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

var port = process.argv.slice(2)[0] || 9000

app.listen(port, function () {
  console.log('Server listening on http://localhost:' + port + ', Ctrl+C to stop')
})