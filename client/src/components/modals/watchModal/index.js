import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './watchModal.css'

class WatchModal extends Component {
  onClickAction = (target) => {
    this.props.manageWatcher()
  }
  render () {
    const { isWatching, isWatchingSpace } = this.props
    return (
      <div className='watch-modals-wrapper'>
        {isWatchingSpace || isWatching
          ? <React.Fragment>
            <h2>You are watching this page</h2>
            <p>Reciving emails updates about changes to this page.</p>
          </React.Fragment>
          : <React.Fragment>
            <h2>You are not watching this page</h2>
            <p>Start watching for emails updates about changes to this page.</p>
          </React.Fragment>
        }
        <div className='watch-checkbox-wrapper'>
          <input type='checkbox' name='isWatchingPage' disabled={isWatchingSpace} onChange={this.props.manageWatcher} checked={isWatchingSpace || isWatching} />
          <label>Watch page</label>
        </div>
        <div className='watch-checkbox-wrapper'>
          <input type='checkbox' name='isWatchingContent' onChange={this.props.manageSpaceWatcher} checked={isWatchingSpace} />
          <label>Watch all content in this space</label>
        </div>
      </div>
    )
  }
}

WatchModal.propTypes = {
  manageWatcher: PropTypes.func,
  isWatching: PropTypes.bool,
  isWatchingSpace: PropTypes.bool,
  manageSpaceWatcher: PropTypes.func
}
WatchModal.defaultProps = {
  isWatching: false
}

export default WatchModal
