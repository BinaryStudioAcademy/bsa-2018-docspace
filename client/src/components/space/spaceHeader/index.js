import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'

import SpaceHeaderButtons from 'src/components/space/spaceHeaderButtons'

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
    const { pathname } = this.props.location
    const type = this.getType()
    const id = pathname.split('/')[2]
    const name = pathname.includes('settings') ? 'Space settings' : this.props.space.name

    return (
      <div className='header'>
        {
          type === 'clear' || type === 'space'
            ? <div className='header-name'>{name}</div>
            : (
              <div className='header-page'>
                <NavLink className='header-name page' to={`/spaces/${id}/overview`}>{this.props.space.name}</NavLink>
                <NavLink className='buttons-item restrictions' title='Unrestricted' to={''}>
                  <i className='fas fa-lock-open' />
                </NavLink>
              </div>
            )
        }
        {
          type !== 'clear'
            ? null
            : (
              <SpaceHeaderButtons type={type}>
                {
                  type === 'space'
                    ? <div className='space-button'>Remove From My Spaces</div>
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
  space: PropTypes.object,
  location: PropTypes.object
}

SpaceHeader.defaultProps = {
  space: {},
  location: {}
}

const mapStateToProps = (state) => {
  return {
    space: state.spaces.byId['5b6beec45aa931280c4fdb29']
  }
}

export default withRouter(connect(mapStateToProps)(SpaceHeader))
