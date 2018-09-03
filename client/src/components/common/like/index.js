import React, {Component} from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import './like.css'

class Like extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isCurrentUserLike: this.findUser(this.props)
    }
    this.changeLikeState = this.changeLikeState.bind(this)
    this.getMessage = this.getMessage.bind(this)
    this.state.message = this.getMessage(this.props)
  }

  changeLikeState () {
    this.likeAction()
  }

  findUser (nextProps) {
    for (let i = 0; i < nextProps.likes.length; i++) {
      if (nextProps.likes[i]._id === nextProps.user._id) {
        return true
      }
    }
    return false
  }

  likeAction () {
    this.props.likePage(!this.state.isCurrentUserLike)
  }

  sortLikes () {
    this.props.likes.sort((a) => {
      return a.id === this.props.user ? 1 : -1
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.setState({isCurrentUserLike: this.findUser(nextProps)})
    }
  }

  getMessage () {
    this.sortLikes()

    const { t, likes } = this.props
    let message
    if (!likes.length) {
      return t('be_the_first_who_like_it')
    } else {
      let maxNumber = this.state.isCurrentUserLike ? 2 : 3
      message = this.state.isCurrentUserLike ? t('you') : ''
      const likeLength = this.state.isCurrentUserLike ? likes.length - 1 : likes.length
      const count = Math.min(likeLength, maxNumber)
      message += this.state.isCurrentUserLike && count ? ', ' : ''
      for (let i = 0; i < count; i++) {
        const name = likes[i].firstName + ' ' + likes[i].lastName
        message += i === count - 1 ? name + '' : name + ', '
      }
      message += likes.length > 3 ? t('and_0_ other_people', { count: likes.length - 3 }) : ''
      message += ' ' + t('already_like_it')
    }
    return message
  }

  render () {
    return (
      <div className='like-wrapper'>
        <button className='like-button' onClick={this.changeLikeState} >
          <i className={`fas fa-thumbs-up ${this.state.isCurrentUserLike ? 'active-like' : 'unactive-like '}`} />
        </button>
        <span>
          {this.getMessage()}
        </span>
      </div>
    )
  }
}

export default translate('translations')(Like)

Like.propTypes = {
  t: PropTypes.func,
  likes: PropTypes.array,
  user: PropTypes.string,
  likePage: PropTypes.func
}
