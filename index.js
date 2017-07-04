#!/usr/bin/env node --harmony

const fs = require('fs')
const program = require('commander'); 
const chalk = require('chalk'); 
const replace = require('replace');
const template = require('./template');

program
 .arguments('<className>')
 .option('-p, --path <path>', 'Add path to new file (relative from current directory)')
 .action(createComponent)
 .parse(process.argv);

function writeFile(className){
  var path;
  if (program.path){
    path = program.path + '/' + className
  } else {
    path = className;
  }

  fs.writeFile(`${path}.js`, template.main, (err) => {
      if (err) throw err;
      replace({
        regex: ":className",
        replacement: className,
        paths: [`${path}.js`],
        recursive: false,
        silent: true,
      });
      console.log(chalk.bold.cyan(`Component ${className} created at ${path}.js`))
    });
}

function checkPath(path) {
  if ( path !== undefined ){
    return fs.existsSync(path)
  }
}

function capitalize(className){
  return className[0].toUpperCase() + className.substring(1, className.length)
}

function createComponent(className){
  if ( program.path && !checkPath(program.path) ) {
    fs.mkdir(program.path, function (err) {
      if (err) {
        console.log('failed to create directory', err);
      }
    })
  }
  writeFile(capitalize(className))
}


