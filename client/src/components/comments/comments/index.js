import React, { Component } from 'react'
import Comment from 'src/components/comments/singleComment'
import AddComment from 'src/components/comments/addComment'

import './comments.css'

class Comments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: []
    }
    this.addNewComment = this.addNewComment.bind(this)
  }

  addNewComment (comment) {
    this.setState(prevState => {
      return { comments: [...prevState.comments, comment] }
    })
  }

  render () {
    return (
      <React.Fragment>
        <div className='comments-section'>
          {this.state.comments.length
            ? <h2>{this.state.comments.length} Comments</h2>
            : <h2>Add comments</h2>
          }
          {this.state.comments && this.state.comments.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}
        </div>
        <AddComment
          firstName='User'
          lastName='name'
          addNewComment={this.addNewComment} />
      </React.Fragment>
    )
  }
}

export default Comments
