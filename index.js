#!/usr/bin/env node

var path = require('path')
var fs = require('fs')
var chalk = require('chalk')
var spawn = require('cross-spawn')
var pathExists = require('path-exists')

function success(msg) {
  console.log(chalk.green(`Success: ${msg}`))
}

function error(msg) {
  console.log(chalk.red(`Error: ${msg}`))
}

function copyRecursiveSync(src, dest) {
  var exists = fs.existsSync(src)
  var stats = exists && fs.statSync(src)
  var isDirectory = exists && stats.isDirectory()
  if (exists && isDirectory) {
    fs.mkdirSync(dest)
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
    })
  } else {
    fs.createReadStream(src).pipe(fs.createWriteStream(dest))
  }
}

function run() {

  var option = process.argv.slice(2)
  var baseDir = process.cwd()
  var projectName = option[0]

  if (!projectName) return error('no project name provided, try `create-bfd-app <project>` instead.')

  if (pathExists.sync(projectName)) return error(`folder ${projectName} exist.`)

  if (process.version.slice(1).split('.')[0] < 6) return error(`Node version should be v6.x.`)

  var dist = path.join(baseDir, projectName)

  copyRecursiveSync(path.join(__dirname, 'template'), dist)
  fs.renameSync(dist + '/gitignore', dist + '/.gitignore')

  success(`Created ${dist}.`)
  console.log('Installing packages.... This might take a couple minutes.')
  spawn('npm', ['install'], {
    stdio: 'inherit',
    cwd: dist
  })
}

run()