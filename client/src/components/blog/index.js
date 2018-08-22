import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBlogRequest } from './logic/blogActions'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { translate } from 'react-i18next'
import BlogPreview from './blogPreview'
import BlogPost from './blogPost'

class Blog extends Component {
  componentDidMount () {
    const { space, actions } = this.props
    space && space.blogId && actions.getBlogRequest(space.blogId)
  }

  render () {
    const {space, blog} = this.props
    return (
      <React.Fragment>
        <Route path='/spaces/:space_id/blog/:page_id' component={BlogPost} />
        <Route path='/spaces/:space_id/blog' exact render={() => <BlogPreview space={space} blog={blog} />} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    space: spaceById(state),
    blog: state.blog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      { getBlogRequest }, dispatch
    )
  }
}

Blog.propTypes = {
  space: PropTypes.object,
  blog: PropTypes.shape({
    _id: PropTypes.string,
    pages: PropTypes.arrayOf(PropTypes.object)
  }),
  actions: PropTypes.object
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog)))
