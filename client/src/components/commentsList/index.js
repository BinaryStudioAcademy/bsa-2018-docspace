import React, { Component } from 'react'
import Comment from '../comments/singleComment'
import {getTree, convertTreeToArray} from './treeBuilder'
import PropTypes from 'prop-types'

import './commentsList.css'
class CommentsList extends Component {
  constructor (props) {
    super(props)
    this.state = {commentTree: this.getComments(props.comments)}
  }

  sortComments () {
    this.props.comments.sort((a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1
    })
  }
  getComments (comments) {
    if (comments) {
      this.sortComments()
      const tree = getTree(comments)
      const flatArray = Array.from(convertTreeToArray(tree, 0))
      return flatArray
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.comments !== nextProps.comments) {
      this.setState({commentTree: this.getComments(nextProps.comments)})
    }
  }

  render () {
    console.log(this.props)
    const commentsList = this.state.commentTree.map(comment =>
      <Comment
        margin={`${comment.level * 25}px`}
        comment={comment.item}
        key={comment.id}
        deleteComment={this.props.deleteComment}
        editComment={this.props.editComment}
        level={comment.level}
        addNewComment={this.props.addNewComment}
        firstName={this.props.firstName}
        lastName={this.props.lastName}
        user={this.props.user}
        likeAction={this.props.likeAction}
      />)
    return (
      <div className='comments-list-wrapper'>
        {commentsList}
      </div>
    )
  }
}

export default CommentsList

CommentsList.propTypes = {
  comments: PropTypes.array,
  deleteComment: PropTypes.func,
  editComment: PropTypes.func,
  addNewComment: PropTypes.func,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  user: PropTypes.obj,
  likeAction: PropTypes.func
}
