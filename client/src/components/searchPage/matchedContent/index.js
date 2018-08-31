import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import ContentListItem from './contentListItem'

import './matchedContent.css'

export default class MatchedContent extends Component {
  render () {
    return (
      <div className='matched-content-wrp'>
        <h2 dangerouslySetInnerHTML={{__html: this.props.items[0] && this.props.items[0].highlight.title[0]}} />
        <br />
        <div dangerouslySetInnerHTML={{__html: this.props.items[0] && this.props.items[0].highlight.content && this.props.items[0].highlight.content[0]}} />
      </div>
    )
  }
}

MatchedContent.propTypes = {
  items: PropTypes.array
}
