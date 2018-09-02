import React, { Component } from 'react'
import BlogHeader from '../blogHeader'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { translate } from 'react-i18next'
import { createBlogPageRequest } from 'src/components/page/logic/pageActions'
import { bindActionCreators } from 'redux'

import './blog.css'

class Blog extends Component {
  handleCreateBlogPage = () => {
    this.props.actions.createBlogPageRequest({ blogId: this.props.blog._id, userId: this.props.userId }, this.props.space._id)
  }

  render () {
    const {space} = this.props
    return (
      <React.Fragment>
        <BlogHeader space={space} />
        <div className='blog-container'>
          <div className='empty-blog-message'>
            <div className='empty-blog-message-title'>Got something to share?</div>
            <div className='empty-blog-message-text'>Blog posts are a great way to share announcements, status reports or other important news with your team.</div>
            <button
              className='empty-blog-message-button'
              onClick={this.handleCreateBlogPage}
            >
              Create Blog Post
            </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    space: spaceById(state),
    blog: state.blog,
    userId: state.verification.user._id
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ createBlogPageRequest }, dispatch)
  }
}

Blog.propTypes = {
  space: PropTypes.object,
  blog: PropTypes.shape({
    _id: PropTypes.string,
    pages: PropTypes.arrayOf(PropTypes.object)
  }),
  actions: PropTypes.object,
  userId: PropTypes.string
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(Blog))
