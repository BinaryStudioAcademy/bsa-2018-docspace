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
      text: this.props.text || '',
      isActiveTextArea: false
    }

    this.setActiveTextAreaStateOnFocus = this.setActiveTextAreaStateOnFocus.bind(this)
    this.cancelSendText = this.cancelSendText.bind(this)
    this.handleText = this.handleText.bind(this)
    this.createComment = this.createComment.bind(this)
  }

  createComment = () => {
    const re = /(?:^|\W)@(\w+)(?!\w)/g
    const resultOfFinding = this.state.text.match(re) ? this.state.text.match(re).map(match => match.trim().slice(1)) : []
    const { text } = this.state
    const { userLogin, pageId, spaceId, type, userId, parentId, _id } = this.props
    const { editComment, onEditComment, addNewComment, sendMention, ReplyComment } = this.props
    if (this.state.text.length === 0) {
    } else {
      this.setState({
        text: ''
      })
      if (this.props.onEditComment) {
        this.props.editComment && editComment({
          userId: userId,
          text: text,
          createdAt: new Date(),
          isDeleted: false,
          parentId: parentId,
          _id: _id
        })
        onEditComment()
      } else {
        if (this.props.sendMention && resultOfFinding.length) {
          sendMention(resultOfFinding, userLogin, pageId, spaceId, type)
        }
        this.props.addNewComment && addNewComment({
          userId: userId,
          text: text,
          createdAt: new Date(),
          isDeleted: false,
          parentId: parentId || null
        })
        this.props.ReplyComment && ReplyComment()
      }
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
      <div className='addComment' style={this.props.style || null}>
        <CommentAvatar UserAvatarLink={this.props.avatar ? this.props.avatar : UserAvatarLink} />
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
              onClick={this.props.onEditComment || this.props.ReplyComment || this.cancelSendText}
            />
          </div>
          }
        </div>
      </div>
    )
  }
}

AddComment.propTypes = {
  type: PropTypes.string,
  addNewComment: PropTypes.func,
  userId: PropTypes.string,
  t: PropTypes.func,
  editComment: PropTypes.func,
  onEditComment: PropTypes.func,
  text: PropTypes.string,
  _id: PropTypes.string,
  ReplyComment: PropTypes.func,
  parentId: PropTypes.string,
  style: PropTypes.object,
  avatar: PropTypes.string,
  sendMention: PropTypes.func,
  userLogin: PropTypes.string,
  pageId: PropTypes.string,
  spaceId: PropTypes.string
}
export default translate('translations')(AddComment)
