import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import SpaceHeaderButtons from 'src/components/space/spaceHeaderButtons'

import 'src/components/space/spaceHeader/spaceHeader.css'

class SpaceHeader extends Component {
  getType () {
    switch (this.props.location.pathname) {
      case '/spaces/TS/overview':
        return 'space'
      case '/spaces/TS/pages/1':
        return 'page'
      default:
        return 'clear'
    }
  }

  render () {
    const buttonsType = this.getType()

    return (
      <div className='header'>
        {
          buttonsType === 'clear' || buttonsType === 'space'
            ? <div className='header-name'>{this.props.space.name}</div>
            : (
              <div className='header-page'>
                <div className='header-name page'>{this.props.space.name}</div>
                <div className='buttons-item restrictions' title='Unrestricted'>
                  <i className='fas fa-lock-open' />
                </div>
              </div>
            )
        }
        {
          buttonsType === 'clear'
            ? null
            : (
              <SpaceHeaderButtons type={buttonsType}>
                {
                  buttonsType === 'space'
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
    space: state.space.space
  }
}

export default withRouter(connect(mapStateToProps)(SpaceHeader))
