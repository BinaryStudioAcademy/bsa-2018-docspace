import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import './header.css'

class Header extends Component {
  render () {
    const hideButtons = this.props.location.pathname === '/spaces/TS/settings' || this.props.location.pathname === '/spaces/TS/blog'
    const showSpaceButton = this.props.location.pathname === '/spaces/TS/overview'

    return (
      <div>
        <div>{this.props.space.name}</div>
        {
          hideButtons
            ? null
            : (
              <div>
                <div>Edit</div>
                <div>Watch</div>
                <div>Share</div>
                <div>Menu</div>
                {
                  showSpaceButton
                    ? <div>Remove from spaces</div>
                    : null
                }
              </div>
            )
        }
      </div>
    )
  }
}

Header.propTypes = {
  space: PropTypes.object,
  location: PropTypes.object
}

Header.defaultProps = {
  space: {},
  location: {}
}

const mapStateToProps = (state) => {
  return {
    space: state.space.space
  }
}

export default withRouter(connect(mapStateToProps)(Header))
