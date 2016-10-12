#!/usr/bin/env node

var path = require('path')
var mkdirp = require('mkdirp')
var chalk = require('chalk')
var ncp = require('ncp').ncp
var spawn = require('cross-spawn')

var option = process.argv.slice(2)
var baseDir = process.cwd()
var projectName = option[0]

if (projectName) {
  mkdirp(projectName)
  var dist = path.join(baseDir, projectName)
  ncp(path.join(__dirname, 'template'), dist)
  console.log(chalk.green('Created ' + dist))
  spawn('npm', ['install'], {
    stdio: 'inherit',
    cwd: dist
  })
} else {
  console.log(chalk.red('Error: no project name provided, try `create-bfd-app <project>` instead.'))
}