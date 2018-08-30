import React from 'react'
import PropTypes from 'prop-types'
import getRightProps from '../chooseContentHelper'
import ContentCard from '../contentCard'
import './myUpdatesTab.css'
import { Link } from 'react-router-dom'

const MyUpdatesTab = (props) => {
  const {firstName, lastName, avatar} = props.user
  if (props.currentUserUpdates.length) {
    return (
      <div className='update-items-list'>
        <div className='current-user-info'>
          <Link to='/userSettings'>
            {avatar
              ? <img src={avatar} alt='avatar' className='current-user-img' />
              : <i id='user-avatar' className='fas fa-user-circle' />
            }
            <h3>{`${firstName} ${lastName}`}</h3>
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
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }),
  currentUserUpdates: PropTypes.array.isRequired
}

export default MyUpdatesTab
