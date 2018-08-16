import React, { Component } from 'react'
import Comment from '../comments/singleComment'
import {getTree, convertTreeToArray} from './treeBuilder'
import PropTypes from 'prop-types'

import './commentsList.css'
class CommentsList extends Component {
  constructor (props) {
    super(props)
    this.comments = this.getComments()
    console.log(this.comments)
  }

  sortComments () {
    this.props.comments.sort((a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1
    })
  }
  getComments () {
    if (this.props.comments) {
      this.sortComments()
      const tree = getTree(this.props.comments)
      const flatArray = Array.from(convertTreeToArray(tree, 0))
      return flatArray
    }
  }

  render () {
    const commentsList = this.comments.map(comment =>
      <Comment
        margin={`${comment.level * 25}px`}
        comment={comment.item}
        key={comment.id}
        deleteComment={this.props.deleteComment}
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
  deleteComment: PropTypes.array
}
