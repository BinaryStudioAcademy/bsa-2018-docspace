import React, {Component} from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import './like.css'

class Like extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isCurrentUserLike: this.findUser()
    }
    this.changeLikeState = this.changeLikeState.bind(this)
    this.sortLikes()
    this.message = this.getMessage()
  }

  changeLikeState () {
    this.setState((prevState) => {
      return {isCurrentUserLike: !prevState.isCurrentUserLike}
    })
  }

  findUser () {
    for (let i = 0; i < this.props.likes.length; i++) {
      if (this.props.likes[i].id === this.props.user) {
        return true
      }
    }
    return false
  }

  sortLikes () {
    this.props.likes.sort((a) => {
      return a.id === this.props.user ? 1 : -1
    })
  }

  getMessage () {
    const {t, likes} = this.props
    console.log(likes)
    let message
    if (!likes.length) {
      return t('be the first who like it')
    } else {
      let maxNumber = this.state.isCurrentUserLike ? 2 : 3
      message = this.state.isCurrentUserLike ? t('you') : ''
      const likeLength = this.state.isCurrentUserLike ? likes.length - 1 : likes.length
      const count = Math.min(likeLength, maxNumber)
      message += this.state.isCurrentUserLike && count ? ', ' : ''
      for (let i = 0; i < count; i++) {
        message += i === count - 1 ? likes[i].name + '' : likes[i].name + ', '
      }
      message += likes.length > 3 ? t('and_0_ other_people', { count: likes.length - 3 }) : ''
      message += ' ' + t('already like it')
    }
    return message
  }

  render () {
    return (
      <div className='like-wrapper'>
        <button onClick={this.changeLikeState} >
          <i className={`fas fa-thumbs-up ${this.state.isCurrentUserLike ? 'active-like' : 'unactive-like '}`} />
        </button>
        <span>
          {this.message}
        </span>
      </div>
    )
  }
}

export default translate('translations')(Like)

Like.propTypes = {
  t: PropTypes.func,
  likes: PropTypes.array,
  user: PropTypes.string
}
