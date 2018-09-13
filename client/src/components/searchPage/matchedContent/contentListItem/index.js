import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import formatDate from 'src/helpers/formatDate'
import './contentListItem.css'

const ContentListItem = ({icon, path, title, time, content, iconColor}) => {
  return (
    <li className='matched-content-list-item'>
      <div className='matched-content-list-item-icon-wrp'>
        {
          iconColor
            ? <i className={icon} style={{color: iconColor}} />
            : <i className={icon} />
        }
      </div>

      <div className='matched-content-list-item-body'>
        <header className='matched-content-list-item-header'>
          <Link to={path} target='_blank'>
            <div dangerouslySetInnerHTML={{__html: title}} />
          </Link>
        </header>
        {
          content && <span className='matched-content-list-item-content' dangerouslySetInnerHTML={{__html: content}} />
        }
        <div className='matched-content-list-item-meta'>
          { time && formatDate(time)}
        </div>
      </div>
    </li>
  )
}
ContentListItem.propTypes = {
  icon: PropTypes.string,
  path: PropTypes.string,
  title: PropTypes.string,
  time: PropTypes.string,
  content: PropTypes.string,
  iconColor: PropTypes.string
}

export default ContentListItem
