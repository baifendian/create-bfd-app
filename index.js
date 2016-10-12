#!/usr/bin/env node

var path = require('path')
var mkdirp = require('mkdirp')
var chalk = require('chalk')
var ncp = require('ncp').ncp
var spawn = require('cross-spawn')
var pathExists = require('path-exists')

function success(msg) {
  console.log(chalk.green(`Success: ${msg}`))
}

function error(msg) {
  console.log(chalk.red(`Error: ${msg}`))
}

function run() {

  var option = process.argv.slice(2)
  var baseDir = process.cwd()
  var projectName = option[0]

  if (!projectName) return error('no project name provided, try `create-bfd-app <project>` instead.')

  if (pathExists.sync(projectName)) return error(`folder ${projectName} exist.`)

  if (process.version.slice(1).split('.')[0] < 6) return error(`Node version should be v6.x.`)

  mkdirp(projectName)
  
  var dist = path.join(baseDir, projectName)
  
  ncp(path.join(__dirname, 'template'), dist)
  success(`Created ${dist}.`)
  
  console.log('Installing packages.... This might take a couple minutes.')

  spawn('npm', ['install'], {
    stdio: 'inherit',
    cwd: dist
  })
}

run()