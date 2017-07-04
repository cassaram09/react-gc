#!/usr/bin/env node --harmony

// harmony adds backwards compatiblity for yield
var fs = require('fs-extra')
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


function createComponent(className) {

  fs.copy('./template.text', `./${className}.js`)
    .then(() => {
      console.log('success!') 
      replace({
        regex: ":className",
        replacement: className,
        paths: [`./${className}.js`],
        recursive: false,
        silent: true,
      });
    }).catch( err => { 
      console.error(err) 
    })
}

