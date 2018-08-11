import React, { Component } from 'react'
import CommentAvatar from 'src/components/comments/commentAvatar'
import UserAvatarLink from 'src/resources/icons/user-comment.png'
import Input from 'src/components/common/input'
import PropTypes from 'prop-types'

import './addComment.css'

class AddComment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      isEmptyTextArea: false,
      isActiveTextArea: false
    }

    this.setActiveTextAreaStateOnFocus = this.setActiveTextAreaStateOnFocus.bind(this)
    this.cancelSendText = this.cancelSendText.bind(this)
    this.handleText = this.handleText.bind(this)
  }

  createComment = () => {
    if (this.state.text.length === 0) {
      this.setState({ isEmptyTextArea: true })
    } else {
      this.setState({
        isEmptyTextArea: false,
        text: ''
      })

      this.props.addNewComment && this.props.addNewComment({
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        text: this.state.text
      })
    }
  }

  handleText (e) {
    this.setState({text: e.target.value})
  }

  setActiveTextAreaStateOnFocus () {
    this.setState({
      isActiveTextArea: true
    })
  }

  cancelSendText () {
    this.setState({
      isActiveTextArea: false,
      text: ''
    })
  }

  render () {
    return (
      <div id='addComment'>
        <CommentAvatar UserAvatarLink={UserAvatarLink} />
        <div className='comment-body-container' >
          <div>
            <Input
              name='comment-body-container-textarea'
              inputType='textarea'
              label='Write a comment...'
              onFocus={this.setActiveTextAreaStateOnFocus}
              onChange={this.handleText}
              value={this.state.text}
            />
          </div>

          {this.state.isActiveTextArea && <div className='comment-body-manage-buttons'>
            {
              this.state.isEmptyTextArea && <p style={{marginTop: '10px'}}>Textarea is empty</p>
            }
            <Input
              name='comment-body-save'
              inputType='button'
              value='Save'
              onClick={this.createComment}
            />
            <Input
              name='comment-body-cancel'
              inputType='button'
              value='Cancel'
              onClick={this.cancelSendText}
            />
          </div>
          }
        </div>
      </div>
    )
  }
}

export default AddComment

AddComment.propTypes = {
  addNewComment: PropTypes.func,
  firstName: PropTypes.string,
  lastName: PropTypes.string
}
