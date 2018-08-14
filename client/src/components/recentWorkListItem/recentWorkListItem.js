import React from 'react'
import PropTypes from 'prop-types'

const RecentWorkListItem = ({src, nameOfItem, nameOfSpace, contributors}) => (
  <div className='recent-work-list-item'>
    <a className='recent-work-link' href=''>
      <img className='recent-work-icon' src={src} alt='Work icon' />
      <span className='recent-work-name'>{nameOfItem}</span>
      <span className='recent-work-name-of-container'>{nameOfSpace}</span>
      <span className='recent-work-contributors'>{contributors}</span>
    </a>
  </div>
)

export default RecentWorkListItem

RecentWorkListItem.propTypes = {
  src: PropTypes.string,
  nameOfItem: PropTypes.string,
  nameOfSpace: PropTypes.string,
  contributors: PropTypes.string
}
