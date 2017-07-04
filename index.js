#!/usr/bin/env node --harmony

var fs = require('fs-extra')
var program = require('commander'); 
var co = require('co');
var prompt = require('co-prompt');
var chalk = require('chalk'); 
var replace = require('replace')

program
 .arguments('<className>')
 .option('-p, --path <path>', 'Add path to new file (relative from current directory)')
 .action(createComponent)
 .parse(process.argv);

function path() {
  if (program.path) {
    return process.cwd() + '/' + program.path
  }
  return process.cwd() + '/';
}

function createFile(className) {
  var promise = new Promise(function(resolve, reject) {
    fs.copy('./template.text', `${path() + className}.js` )
      .then(() => {
        resolve(className);
      }).catch( err => { 
        reject(Error("File not created."));
      })
  });
  return promise;
}

function replaceFunc(className) {
  var promise = new Promise(function(resolve, reject) {
    replace({
      regex: ":className",
      replacement: className,
      paths: [`${path() + className}.js`],
      recursive: false,
      silent: true,
    });
    resolve(className);
  });
  return promise;
}

function createComponent(className){
  return createFile(className)
    .then(replaceFunc)
    .then( (className ) =>{
      console.log(chalk.bold.cyan(`Component ${className} created at ${ ( program.path || './' ) + className}.js`))
    })
}