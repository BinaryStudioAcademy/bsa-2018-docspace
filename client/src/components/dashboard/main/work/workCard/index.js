import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './workCard.css'

const WorkCard = (props) => {
  const { icon, path, name, isDeleted } = props.content
  const disabledLink = isDeleted ? 'disabled-link' : ''
  return (
    <Link to={path} className={`content-card-name-work ${disabledLink}`}>
      <div className='work-card-history'>
        <i id='content-icon' className={`${icon}`} />
        {name}
        {isDeleted
          ? <span className='content-card-deleted'>
            <i className='far fa-trash-alt' />
          </span>
          : null}
      </div>
    </Link>
  )
}

WorkCard.propTypes = {
  content: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
    path: PropTypes.string,
    isDeleted: PropTypes.bool})
}

export default WorkCard
