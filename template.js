const main = `
class :className extends Component {
  constructor(props){
    super(props)

  }

  render(){
    return (

    )
  }

}

:className.propTypes = {

}
`

const imports = {
  react: "import React, {Component} from 'react'",
  propTypes: "import PropTypes from 'prop-types'",
  bindActionCreators: "import {bindActionCreators} from 'redux'",
  connect: "import {connect} from 'react-redux'"
}

const exported = {
  default: "export default :className;"
  connectState: "export default connect(mapStateToProps)(:className);"
  connectDispatch: "export default connect(null, mapDispatchToProps)(:className);"
  connectStateAndDispatch: "export default connect(mapStateToProps, mapDispatchToProps)(:className);"
}

const mapStateToProps = `
function mapStateToProps(state, ownProps) { 
  return {};
};
`

const mapDispatchToProps = `
function mapDispatchToProps(dispatch) {  
  return {};
}
`

module.exports = {
  main: main,
  imports: imports,
  exports: exported,
  state: mapStateToProps,
  dispatch: mapDispatchToProps
}