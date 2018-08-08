import React, { Component } from 'react'

import './spacesContent.css'

class SpacesContent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      active: '',
      search: ''
    }
  }
  render () {
    return (
      <div className={'spaces__content__body'} >
        <span />
      </div>
    )
  }
}

export default SpacesContent
