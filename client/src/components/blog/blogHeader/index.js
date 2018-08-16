import React from 'react'
import { translate } from 'react-i18next'
import SpaceHeaderButtons from 'src/components/space/spaceHeaderButtons'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './blogHeader.css'

const BlogHeader = ({space, t, blogIsEmpty}) => (
  <div className='blog-header'>
    {
      blogIsEmpty
        ? <div className='blog-header-title'> Blog </div>
        : <React.Fragment>
          <div className='space-link-block'>
            <NavLink className='space-name-link' to={`/spaces/${space._id}/overview`}>{space && space.name}</NavLink>
            <NavLink className='buttons-item restrictions' title={t('Unrestricted')} to={''}>
              <i className='fas fa-lock-open' />
            </NavLink>
          </div>
          <SpaceHeaderButtons type='page' />
        </React.Fragment>

    }
  </div>
)

BlogHeader.propTypes = {
  t: PropTypes.func.isRequired,
  space: PropTypes.object,
  blogIsEmpty: PropTypes.bool
}

BlogHeader.defaultProps = {
  blogIsEmpty: true
}

export default translate('translations')(BlogHeader)
