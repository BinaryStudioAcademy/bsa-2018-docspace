import React from 'react'
import PropTypes from 'prop-types'
import getRightProps from '../chooseContentHelper'
import ContentCard from '../contentCard'
import './myUpdatesTab.css'
import { Link } from 'react-router-dom'
import { MoonLoader } from 'react-spinners'

const MyUpdatesTab = (props) => {
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
      {props.isFetching
        ? <div className='moon-loader-container'>
          <MoonLoader
            sizeUnit={'px'}
            size={32}
            color={'#123abc'}
          />
        </div>
        : <div className='update-items'>
          {props.currentUserUpdates.map((item, index) => {
            let content = getRightProps(item)
            if (content) {
              return <ContentCard key={index} content={content} />
            }
            return null
          }
          )}
        </div>
      }
    </div>
  )
  // }
  // return null
}

MyUpdatesTab.propTypes = {
  user: PropTypes.object.isRequired,
  currentUserUpdates: PropTypes.array,
  isFetching: PropTypes.bool
}

export default MyUpdatesTab
