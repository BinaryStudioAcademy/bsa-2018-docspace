import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { translate } from 'react-i18next'

import './spacePagesList.css'

const SpacePagesList = ({ pages, spaceId, t }) => {
  return (
    <div className='pages-list'>
      <div className='pages-list-title'>
        {t('pages')}
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
  spaceId: PropTypes.string,
  t: PropTypes.func
}

SpacePagesList.defaultProps = {
  pages: [],
  spaceId: ''
}

export default translate('translations')(SpacePagesList)
