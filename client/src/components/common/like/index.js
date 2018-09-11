import React, {Component} from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import './like.css'

class Like extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLiked: this.findUser(this.props.likes, this.props.user._id)
    }
    this.getMessage = this.getMessage.bind(this)
    this.state.message = this.getMessage(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.likes.length !== nextProps.likes.length) {
      this.setState({isLiked: this.findUser(nextProps.likes, this.props.user._id)})
    }
  }

  findUser (arrLikes, userId) {
    for (let like of arrLikes) {
      if (like._id === userId) {
        return true
      }
    }
    return false
  }

  toggleLikeClick = () => {
    this.props.likePage(this.state.isLiked)
    this.setState({isLiked: !this.state.isLiked})
  }

  sortLikes () {
    this.props.likes.sort((a, b) => {
      return a.firstName > b.firstName ? -1 : 1
    })
  }

  getMessage () {
    this.sortLikes()

    const { t, likes } = this.props
    let message
    if (!likes.length) {
      return t('be_the_first_who_like_it')
    } else {
      let maxNumber = this.state.isLiked ? 2 : 3
      message = this.state.isLiked ? t('you') : ''
      const likeLength = this.state.isLiked ? likes.length - 1 : likes.length
      const count = Math.min(likeLength, maxNumber)
      message += this.state.isLiked && count ? ', ' : ''
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
        <button className='like-button' onClick={this.toggleLikeClick} >
          <i className={`fas fa-thumbs-up ${this.state.isLiked ? 'active-like' : 'unactive-like '}`} />
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
  user: PropTypes.object,
  likePage: PropTypes.func
}
