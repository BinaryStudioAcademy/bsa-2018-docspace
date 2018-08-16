import React, { Component } from 'react'
import { AddComment } from 'src/components/comments/addComment'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import './comments.css'

export class Comments extends Component {
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
    const { t } = this.props
    console.log(this.comments)
    return (
      <React.Fragment>
        <div className='comments-section'>
          {this.state.comments.length
            ? <h2>{this.state.comments.length} {t('Comments')}</h2>
            : <h2>{t('add_comments')}</h2>
          }
          {/* <CommentsList comments={this.comments} t={t} /> */}
        </div>
        <AddComment
          firstName='User'
          lastName='name'
          addNewComment={this.addNewComment}
          t={t}
        />
      </React.Fragment>
    )
  }
}
Comments.propTypes = {
  t: PropTypes.func
}

export default translate('translations')(Comments)
