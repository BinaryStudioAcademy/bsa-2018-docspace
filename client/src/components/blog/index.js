import React, { Component } from 'react'
import BlogHeader from './blogHeader'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { translate } from 'react-i18next'

import './blog.css'

class Blog extends Component {
  render () {
    const {space} = this.props
    return (
      <React.Fragment>
        <BlogHeader space={space} />
        <div className='blog-container'>
          <div className='empty-blog-message'>
            <div className='empty-blog-message-title'>Got something to share?</div>
            <div className='empty-blog-message-text'>Blog posts are a great way to share announcements, status reports or other important news with your team.</div>
            <button className='empty-blog-message-button'>Create Blog Post</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    space: spaceById(state)
  }
}

Blog.propTypes = {
  space: PropTypes.object
}

export default translate('translations')(connect(mapStateToProps)(Blog))
