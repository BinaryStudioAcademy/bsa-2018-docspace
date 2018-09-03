import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'
import { translate } from 'react-i18next'

import SpaceHeaderButtons from 'src/components/space/spaceHeaderButtons'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'

import './spaceHeader.css'

class SpaceHeader extends Component {
  getType () {
    const { pathname } = this.props.location

    if (pathname.includes('overview')) {
      return 'space'
    }

    if (pathname.includes('pages')) {
      return 'page'
    }

    return 'clear'
  }

  render () {
    const { t, space } = this.props
    const { pathname } = this.props.location
    const type = this.getType()
    const id = pathname.split('/')[2]
    const name = pathname.includes('settings') ? 'Space settings' : space.name

    return (
      <div className='space-header'>
        {
          type === 'clear' || type === 'space'
            ? <div className='space-header-name'>{name}</div>
            : (
              <div className='space-header-page'>
                <NavLink className='space-header-name page' to={`/spaces/${id}/overview`}>{space.name}</NavLink>
                <NavLink className='buttons-item restrictions' title={t('unrestricted')} to={''}>
                  <i className='fas fa-lock-open' />
                </NavLink>
              </div>
            )
        }
        {
          type === 'clear'
            ? null
            : (
              <SpaceHeaderButtons type={type}>
                {
                  type === 'space'
                    ? <div className='space-button'>{t('remove_from_My_Spaces')}</div>
                    : null
                }
              </SpaceHeaderButtons>
            )
        }
      </div>
    )
  }
}

SpaceHeader.propTypes = {
  t: PropTypes.func.isRequired,
  space: PropTypes.object,
  location: PropTypes.object
}

SpaceHeader.defaultProps = {
  space: {},
  location: {}
}

const mapStateToProps = (state) => {
  return {
    space: spaceById(state)
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps)(SpaceHeader)))
