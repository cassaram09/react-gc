#!/usr/bin/env node --harmony

// harmony adds backwards compatiblity for yield
var fs = require('fs-extra')
var async = require('async-file')
var program = require('commander'); // provide nice abstractions for parsing arguments and options
var co = require('co');
var prompt = require('co-prompt');
// co and co prompt allow us to gather user feedback and use ES6 'yield' keyword
// This lets us write async code without callbacks that feels more scripty
var chalk = require('chalk'); // colorization
var progress = require('progress'); // progress
var replace = require('replace') // node replace

program
 .arguments('<className>')
 .option('-d, --dispatch', 'Add mapDispatchToProps')
 .option('-stp, --state', 'Add mapStateToProps')
 .action(createComponent)
 .parse(process.argv);

 function createFile(className) {
  var promise = new Promise(function(resolve, reject) {
    fs.copy('./template.text', `./${className}.js`)
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
      paths: [`./${className}.js`],
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
      console.log(chalk.bold.cyan(`Component ${className} created at ./${className}.js`))
    })
}