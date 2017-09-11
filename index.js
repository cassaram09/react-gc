#!/usr/bin/env node --harmony

// Don't pollute our global scope!
(function () {
  const fs = require('fs')
  const program = require('commander'); 
  const chalk = require('chalk'); 
  const replace = require('replace');
  const template = require('./template');

  program
   .arguments('<className>')
   .option('-p, --path <path>', 'Create file in a new directory')
   .option('-d, --dispatch', 'Add mapDisptatchToProps')
   .option('-s, --state', 'Add mapStateToProps')
   .option('-b, --basic', 'Basic presentational component')
   .action(createComponent)
   .parse(process.argv);

   // build our new component
  function createComponent(className){
    var template = buildTemplate()
    createDirectory();
    writeFile(template, className)
  }

  // Write the template to a file and replace our className variables
  function writeFile(template, className){
    var path;
    program.path ? path = (program.path + '/' + className) : path = className;

    fs.writeFile(`${path}.js`, template, (err) => {
      if (err) throw err;
      replace({
        regex: ":className",
        replacement: capitalize(className),
        paths: [`${path}.js`],
        recursive: false,
        silent: true,
      });
      console.log(chalk.bold.cyan(`Component ${className} created at ${path}.js`))
    });
  }

  // create a directory if passed a --path option and no directory exists
  function createDirectory(){
    var path = program.path
    if ( path && !fs.existsSync(path) ) {
      fs.mkdir(path, function (err) {
        if (err) throw err;
      })
    }
  }

  // capitalize our className in case the user forgets (only first letter...)
  function capitalize(className){
    return className[0].toUpperCase() + className.substring(1, className.length)
  }

  // build the template - we'll replace variables later
  function buildTemplate(){
    return buildImports() + '\n' + buildBody() + '\n' + buildExports()
  }

  // build the imports for our component
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

  // build the body of our component
  function buildBody(){
    var body = [template.main]
    if ( program.basic ){
      body = [template.basic]
      return body.join('\n')
    }
    if ( program.state) {
      body.push(template.state)
    }
    if ( program.dispatch) {
      body.push(template.dispatch)
    }
    return body.join('\n')
  }

  // build the exports for our component
  function buildExports(){
    var exported = []
    if ( !program.state && !program.dispatch ) {
      exported.push(template.exported.default);
      return exported.join('')
    }
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

 }
)()
