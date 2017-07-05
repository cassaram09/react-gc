#!/usr/bin/env node --harmony

const fs = require('fs')
const program = require('commander'); 
const chalk = require('chalk'); 
const replace = require('replace');
const template = require('./template');

program
 .arguments('<className>')
 .option('-p, --path <path>', 'Add path to new file (relative from current directory)')
 .option('-d, --dispatch', 'Add dispatch')
 .option('-s, --state', 'Add state')
 .action(createComponent)
 .parse(process.argv);

function writeFile(className){
  var path;
  if (program.path){
    path = program.path + '/' + className
  } else {
    path = className;
  }

  var template = buildTemplate();

  fs.writeFile(`${path}.js`, template, (err) => {
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

function buildTemplate(){
  return buildImports() + '\n' + buildBody() + '\n' + buildExports()
}

function buildImports(){
  var imports = [template.imports.react, template.imports.propTypes]
  if ( program.state || program.dispatch ) {
    imports.push(template.imports.connect)
  }
  if ( program.dispatch ) {
    imports.push(template.imports.bindActionCreators)
  }
  return imports.join('\n')
}

function buildBody(){
  var body = [template.main]
  if ( program.state) {
    body.push(template.state)
  }
  if ( program.dispatch) {
    body.push(template.dispatch)
  }
  return body.join('\n')
}

function buildExports(){
  var exported = []
  if ( program.state && program.dispatch ) {
    exported.push(template.exported.connectStateAndDispatch);
    return exported.join('')
  }
  if ( program.state ) {
    exported.push(template.exported.connectState);
  }
  if ( program.dispatch ) {
    exported.push(template.exported.connectDispatch);
  }
  return exported.join('')
}
