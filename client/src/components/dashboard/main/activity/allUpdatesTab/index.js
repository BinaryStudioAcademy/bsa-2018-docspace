import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const getRightProps = (content) => {
  switch (content.action) {
    case 'CREATE_SPACE_SUCCESS':
      return {
        name: content.spaceId.name,
        time: new Date(content.date).toLocaleString(),
        path: `/spaces/${content.spaceId._id}/overview`,
        icon: 'fas fa-folder',
        action: 'New space created',
        isDeleted: content.spaceId.isDeleted
      }
    case 'UPDATE_SPACE_SUCCESS':
      return {
        name: content.spaceId.name,
        time: new Date(content.date).toLocaleString(),
        path: `/spaces/${content.spaceId._id}/overview`,
        icon: 'fas fa-folder',
        action: 'Update space',
        isDeleted: content.spaceId.isDeleted
      }
    case 'CREATE_PAGE_SUCCESS':
      return {
        name: content.pageId.title,
        time: new Date(content.date).toLocaleString(),
        path: `/spaces/${content.spaceId._id}/pages/${content.pageId._id}`,
        icon: 'fas fa-file-alt',
        action: 'New page created',
        isDeleted: content.pageId.isDeleted
      }
    case 'UPDATE_PAGE_SUCCESS':
      return {
        name: content.pageId.title,
        time: new Date(content.date).toLocaleString(),
        path: `/spaces/${content.spaceId._id}/pages/${content.pageId._id}`,
        icon: 'fas fa-file-alt',
        action: 'Update page',
        isDeleted: content.pageId.isDeleted
      }
    case 'CREATE_COMMENT_SUCCESS':
      return {
        name: content.pageId.title,
        time: new Date(content.date).toLocaleString(),
        path: `/spaces/${content.spaceId._id}/pages/${content.pageId._id}`,
        icon: 'fas fa-comment',
        action: `New comment ${content.commentId.text}`,
        isDeleted: content.commentId.isDeleted
      }
    case 'EDIT_COMMENT_SUCCESS':
      return {
        name: content.pageId.title,
        time: new Date(content.date).toLocaleString(),
        path: '#',
        icon: 'fas fa-comment',
        action: `Comment edited ${content.commentId.text}`,
        isDeleted: content.commentId.isDeleted
      }
    default:
      return null
  }
}

const ContentCard = (props) => {
  const { icon, path, name, action, time, isDeleted } = props.content
  const disabledLink = isDeleted ? 'disabled-link' : ''
  return (
    <div className='content-card'>
      <i id='content-icon' className={`${icon}`} />
      <Link to={path} className={`content-card-name ${disabledLink}`}>
        {name}
      </Link>
      {isDeleted
        ? <span data-title='deleted' className='content-card-deleted'>
          <i className='far fa-trash-alt' />
        </span>
        : null}
      <p className='content-card-action'>{action}</p>
      <p className='content-card-time' >{time}</p>
    </div>
  )
}

const AllUpdatesTab = (props) => {
  if (props.allUpdates.length) {
    return (
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

ContentCard.propTypes = {
  content: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
    time: PropTypes.string,
    path: PropTypes.string,
    action: PropTypes.string,
    isDeleted: PropTypes.bool})
}

AllUpdatesTab.propTypes = {
  userAvatar: PropTypes.string,
  userName: PropTypes.string.isRequired,
  allUpdates: PropTypes.array.isRequired
}

export default AllUpdatesTab
