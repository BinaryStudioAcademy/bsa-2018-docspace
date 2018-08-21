import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const getRightProps = (content) => {
  console.log(content)
  switch (content.action) {
    case 'CREATE_SPACE_SUCCESS':
    case 'UPDATE_SPACE_SUCCESS':
      return {
        name: content.spaceId.name,
        time: new Date(content.date).toLocaleString(),
        path: `/spaces/${content.spaceId._id}/overview`,
        icon: 'fas fa-folder'
      }
    case 'CREATE_PAGE_SUCCESS':
    case 'UPDATE_PAGE_SUCCESS':
      return {
        name: content.pageId.title,
        time: new Date(content.date).toLocaleString(),
        path: '#',
        icon: 'fas fa-file-alt'
      }
    case 'CREATE_COMMENT_SUCCESS':
    case 'EDIT_COMMENT_SUCCESS':
      return {
        name: content.commentId.name,
        time: new Date(content.date).toLocaleString(),
        path: '#',
        icon: 'fas fa-file-alt'
      }
  }
}

const ContentCard = (props) => (
  <div className='content-card'>
    <i id='content-icon' className={`${props.content.icon}`} />
    <Link to='' className='content-card-name'>{props.content.name}</Link>
    <p className='content-card-time' >{props.content.time}</p>
  </div>
)

const AllUpdatesTab = (props) => (
  <div className='update-items-list'>
    <div className='current-user-info'>
      {props.userAvatar
        ? <img src={props.userAvatar} alt='avatar' />
        : <i id='user-avatar' className='fas fa-user-circle' />
      }

      <h3>{props.userName}</h3>
    </div>
    <div className='update-items'>
      {props.allUpdates.map((item, index) => {
        let content = getRightProps(item)
        return <ContentCard key={index} content={content} />
      }
      )}
    </div>
  </div>
)

ContentCard.propTypes = {
  content: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
    time: PropTypes.string
  })
}

AllUpdatesTab.propTypes = {
  userAvatar: PropTypes.string,
  userName: PropTypes.string,
  allUpdates: PropTypes.object
}

export default AllUpdatesTab
