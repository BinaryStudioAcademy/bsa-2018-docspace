import React, { Component } from 'react'
import CommentAvatar from 'src/components/comments/commentAvatar'
import UserAvatarLink from 'src/resources/icons/user-comment.png'
import Input from 'src/components/common/input'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import './addComment.css'

export class AddComment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      isActiveTextArea: false
    }

    this.setActiveTextAreaStateOnFocus = this.setActiveTextAreaStateOnFocus.bind(this)
    this.cancelSendText = this.cancelSendText.bind(this)
    this.handleText = this.handleText.bind(this)
  }

  createComment = () => {
    if (this.state.text.length === 0) {
    } else {
      this.setState({
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
    const { t } = this.props
    return (
      <div className='addComment'>
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
            {!this.state.text.length
              ? <Input
                name='comment-body-disabled'
                inputType='button'
                value={t('save')}
              />
              : <Input
                name='comment-body-save'
                inputType='button'
                value={t('save')}
                onClick={this.createComment}
              />
            }
            <Input
              name='comment-body-cancel'
              inputType='button'
              value={t('cancel')}
              onClick={this.cancelSendText}
            />
          </div>
          }
        </div>
      </div>
    )
  }
}

AddComment.propTypes = {
  addNewComment: PropTypes.func,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  t: PropTypes.func
}
export default translate('translations')(AddComment)
