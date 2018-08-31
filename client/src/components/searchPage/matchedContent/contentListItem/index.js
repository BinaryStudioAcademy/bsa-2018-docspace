import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ContentListItem = ({icon, path, title, time, content}) => (
  <li className='content-list-item'>
    <h3 className='content-list-item-header'>
      <i className={icon} />
      <Link to={path}>
        <div dangerouslySetInnerHtml={{_html: title}} />
      </Link>
    </h3>
    <div className='content-list-item-body' dangerouslySetInnerHtml={{_html: content}} />
    <div className='content-list-item-meta'>
      {time}
    </div>
  </li>
)

ContentListItem.propTypes = {
  icon: PropTypes.string,
  path: PropTypes.string,
  title: PropTypes.string,
  time: PropTypes.string,
  content: PropTypes.string
}

export default ContentListItem
