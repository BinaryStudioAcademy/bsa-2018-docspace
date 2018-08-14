import React, { Component } from 'react'
import Comment from '../comments/singleComment'
import {getTree, convertTreeToArray} from './treeBuilder'
import PropTypes from 'prop-types'

import './commentsList.css'
class CommentsList extends Component {
  sortComments () {
    this.props.comments.sort((a, b) => {
      return a.date > b.date ? 1 : -1
    })
  }
  getComments () {
    this.sortComments()
    const tree = getTree(this.props.comments)
    const flatArray = Array.from(convertTreeToArray(tree, 0))
    return flatArray
  }

  render () {
    const comments = this.getComments()
    const commentsList = comments.map(comment => <Comment margin={`${comment.level * 25}px`} comment={comment.item} />)
    return (
      <div className='comments-list-wrapper'>
        {commentsList}
      </div>
    )
  }
}

export default CommentsList

CommentsList.propTypes = {
  comments: PropTypes.array
}
