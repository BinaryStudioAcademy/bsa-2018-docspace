import React from 'react'
import PropTypes from 'prop-types'
import getRightProps from '../chooseContentHelper'
import ContentCard from '../contentCard'
import './myUpdatesTab.css'
import { Link } from 'react-router-dom'

const MyUpdatesTab = (props) => {
  if (props.currentUserUpdates.length) {
    return (
      <div className='update-items-list'>
        <div className='current-user-info'>
          <Link to={`/users/${props.user.login}`}>
            {props.user.avatar
              ? <img src={props.user.avatar} alt='avatar' className='current-user-img' />
              : <i id='user-avatar' className='fas fa-user-circle' />
            }
            <h3>{props.user.firstName} {props.user.lastName}</h3>
          </Link>
        </div>
        <div className='update-items'>
          {props.currentUserUpdates.map((item, index) => {
            let content = getRightProps(item)
            if (content) {
              return <ContentCard key={index} content={content} />
            }
            return null
          }
          )}
        </div>
      </div>
    )
  }
  return null
}

MyUpdatesTab.propTypes = {
  currentUserUpdates: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

export default MyUpdatesTab
