import React, {Component} from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import './like.css'

class Like extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liked: this.findUser()
    }
    this.changeLikeState = this.changeLikeState.bind(this)
    this.likes = this.props.likes
    this.user = this.props.user
    this.sortLikes()
    this.message = this.getMessage()
  }

  changeLikeState () {
    this.setState((prevState) => {
      return {liked: !prevState.liked}
    })
  }

  findUser () {
    const likes = this.props.likes
    const user = this.props.user
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].id === user) {
        return true
      } else {
      }
    }
    return false
  }

  sortLikes () {
    this.likes.sort((a) => {
      if (a.id === this.user) {
        return -1
      } else {
        return 1
      }
    })
  }

  getMessage () {
    const {t} = this.props
    if (!this.likes.length) {
      return t('be the first who like it')
    } else if (this.state.liked) {
      if (this.likes.length === 1) {
        return `${t('you')} ${t('already like it')}!`
      } else if (this.likes.length === 2) {
        return `${t('you')} ${t('and')} ${this.likes[1].name}  ${t('already like it')}!`
      } else if (this.likes.length === 3) {
        return `${t('you')}, ${this.likes[1].name} ${t('and')} ${this.likes[2].name}  ${t('already like it')}!`
      } else {
        return `${t('you')}, ${this.likes[1].name}, ${this.likes[2].name} ${t('and')} 
        ${this.likes.length - 3} ${t('other people')} ${t('already like it')}!`
      }
    } else {
      console.log(this.likes)
      if (this.likes.length === 1) {
        return `${this.likes[0].name} ${t('already like it')}!`
      } else if (this.likes.length === 2) {
        return `${this.likes[0].name} ${t('and')} ${this.likes[1].name} ${t('already like it')}!`
      } else if (this.likes.length === 3) {
        return `${this.likes[0].name}, ${this.likes[1].name} ${t('and')}  ${this.likes[2].name} ${t('already like it')}!`
      } else {
        return `${this.likes[0].name}, ${this.likes[1].name}, ${this.likes[1].name} ${t('and')} 
        ${this.likes.length - 3} ${t('other people')} ${t('already like it')}!`
      }
    }
  }

  render () {
    return (
      <div className='like-wrapper'>
        <button onClick={this.changeLikeState} >
          <i className={`fas fa-thumbs-up ${this.state.liked ? 'active-like' : 'unactive-like '}`} />
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
