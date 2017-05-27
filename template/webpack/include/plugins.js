var fs = require('fs')
var path = require('path')
var LiveReloadPlugin = require('webpack-livereload-plugin')

function WriteIndex(config) {
  this.config = config || {}
}

WriteIndex.prototype.apply = function(compiler) {
  var index = './index.html'
  var config = this.config

  compiler.plugin('done', function(statsData) {
    var stats = statsData.toJson()
    var html = fs.readFileSync(index, 'utf8')
    var target = '/' + config.static + '/'
    var name = config.dev ? 'app.js' : 'app.' + statsData.hash + '.js'
    var app = target + name
    html = html.replace(/(<script src=").*?(")/, '$1' + app + '$2')
    fs.writeFileSync(path.join(config.target || '.', index), html)
  })
}

module.exports = {
  WriteIndex: WriteIndex,
  LiveReloadPlugin: LiveReloadPlugin
}
