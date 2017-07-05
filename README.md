# react-gc
`react-gc` is A Node command line tool for quickly generating the framework of React components. 

## Installation

`npm install react-gc -g`

Install `react-gc` globally for use in your terminal.

## Usage

### New component
`react-gc <filename>`
Creates a standard React component:

```
$ react-gc myComponent

//outputs myComponent.js in current directory: 

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div id="MyComponent">
    
      </div>
    )
  }

}

MyComponent.propTypes = {

}

export default MyComponent;
```
### New component in different directory
`react-gc <filename> -p <path>`
Creates a standard React component in a new directory (or an existing one):

```
$ react-gc myComponent -p components

//outputs myComponent.js in ./components/myComponent.js:

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div id="MyComponent">
    
      </div>
    )
  }

}

MyComponent.propTypes = {

}

export default MyComponent;
```

### New basic component
`react-gc <filename> -b`
Creates a standard React component in a new directory (or an existing one):

```
$ react-gc myComponent -b 

//outputs a myComponent.js in current directory:

import React, {Component} from 'react';
import PropTypes from 'prop-types';

const MyComponent = () => {
  return (
    <div id="MyComponent">

    </div>
  )
}

MyComponent.propTypes = {

}

export default MyComponent;
```

### Add mapDispatchToProps or mapStateToProps
`react-gc <filename> -d` or `react-gc <filename> -s`
Creates a standard React component with Redux mapDispatchToProps or mapStateToProps:

```
$ react-gc myComponent -d 

//outputs a myComponent.js in current directory:

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class MyComponent extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div id="MyComponent">
    
      </div>
    )
  }

}

MyComponent.propTypes = {

}

function mapDispatchToProps(dispatch) {  
  return {};
}

export default connect(null, mapDispatchToProps)(MyComponent);
```