import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './spacePagesList.css'

const SpacePagesList = ({ pages, spaceId }) => {
  return (
    <div className='pages-list'>
      <div className='pages-list-title'>
        Pages
      </div>
      <div>
        {
          pages.map((page) => {
            return (
              <NavLink className='pages-list-item' key={page._id} to={`/spaces/${spaceId}/pages/${page._id}`} activeClassName='current'>
                <div className='pages-list-item-icon'>•</div>
                <div className='pages-list-item-name'>{page.title}</div>
              </NavLink>
            )
          })
        }
      </div>
    </div>
  )
}

SpacePagesList.propTypes = {
  pages: PropTypes.array,
  spaceId: PropTypes.string
}

SpacePagesList.defaultProps = {
  pages: [],
  spaceId: ''
}

export default SpacePagesList
