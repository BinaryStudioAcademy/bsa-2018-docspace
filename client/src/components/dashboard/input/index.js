import React, { Component } from 'react'
import './input.css'

class Input extends Component {

  render () {
    return (
      <input className={this.props.className} className={"input"} placeholder={this.props.placeholder} autoComplete="off" type="text"/>
        
      
    )
  }
}


export default Input;