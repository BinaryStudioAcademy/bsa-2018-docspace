import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './spacePagesList.css'

const SpacePagesList = ({ pages }) => {
  return (
    <div className='pages-list'>
      <div className='pages-list-title'>
        Pages
      </div>
      <div>
        {
          pages.map((page) => {
            return (
              <NavLink className='pages-list-item' key={page.id} to={`/spaces/5b6beec45aa931280c4fdb29/pages/${page.id}`} activeClassName='current'>
                <div className='pages-list-item-icon'>•</div>
                <div className='pages-list-item-name'>{page.name}</div>
              </NavLink>
            )
          })
        }
      </div>
    </div>
  )
}

SpacePagesList.propTypes = {
  pages: PropTypes.array
}

SpacePagesList.defaultProps = {
  pages: []
}

export default SpacePagesList
