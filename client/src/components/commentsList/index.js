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

  sortComments (comments) {
    comments.sort((a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1
    })
  }
  getComments (comments) {
    if (comments) {
      this.sortComments(comments)
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
    const commentsList = this.state.commentTree.map(comment =>
      <Comment
        margin={`${comment.level * 25}px`}
        comment={comment.item}
        key={comment.id}
        deleteComment={this.props.deleteComment}
        editComment={this.props.editComment}
        replyComment={this.replyComment}
        level={comment.level}
        addNewComment={this.props.addNewComment}
        sendMention={this.props.sendMention}
        user={this.props.user}
        userId={this.props.userId}
        pageId={this.props.pageId}
        spaceId={this.props.spaceId}
        type={this.props.type}
        likeAction={this.props.likeAction}
      />
    )
    return (
      <div className='comments-list-wrapper'>
        {commentsList}
      </div>
    )
  }
}

export default CommentsList

CommentsList.propTypes = {
  type: PropTypes.string,
  pageId: PropTypes.string,
  spaceId: PropTypes.string,
  comments: PropTypes.array,
  deleteComment: PropTypes.func,
  editComment: PropTypes.func,
  addNewComment: PropTypes.func,
  userId: PropTypes.string,
  sendMention: PropTypes.func,
  user: PropTypes.object,
  likeAction: PropTypes.func
}
