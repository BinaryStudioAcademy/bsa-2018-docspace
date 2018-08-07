import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import 'src/components/page/page.css'

class Page extends Component {
  render () {
    return (
      <div className='page-container'>
        <div className='page-main'>
          <div className='page-main-title'>{this.props.page.title}</div>
          <div className='page-main-info-container'>
            <div className='page-main-info-image'>
              <img src={this.props.page.created.user.avatar} alt='UserAvatar' />
            </div>
            <div className='page-main-info'>
              <div className='page-main-info-author'>{this.props.page.created.user.firstName + ' ' + this.props.page.created.user.lastName}</div>
              <div className='page-main-info-time'>{this.props.page.created.date}</div>
            </div>
          </div>
          <div className='page-main-content'>{this.props.page.content}</div>
        </div>
        <div className='page-extra'>
          <div className='likes'>Likes</div>
          <div className='labels'>Labels</div>
          <div className='comments'>Comments</div>
        </div>
      </div>
    )
  }
}
Page.propTypes = {
  page: PropTypes.object
}

Page.defaultProps = {
  page: {}
}

const mapStateToProps = (state) => {
  return {
    page: state.page.page
  }
}

export default connect(mapStateToProps)(Page)
