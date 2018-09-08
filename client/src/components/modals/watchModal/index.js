import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './watchModal.css'

class WatchModal extends Component {
  onClickAction = (target) => {
    // console.log(target)
    // this.setState({
    //   [target.name]: target.checked
    // }, function () {
    this.props.manageWatcher()
    // })
  }
  render () {
    console.log(this.state)
    console.log(this.props)
    return (
      <div className='watch-modals-wrapper'>
        {this.props.isWatching
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
          <input type='checkbox' name='isWatchingPage' onChange={({target}) => this.onClickAction(target)} checked={this.props.isWatching} />
          {/* <label className='watch-checkbox' /> */}
          <label>Watch page</label>
        </div>
        <div className='watch-checkbox-wrapper'>
          <input type='checkbox' name='isWatchingContent' onChange={({target}) => this.onClickAction(target)} checked={this.props.isWatching} />
          {/* <label className='watch-checkbox' /> */}
          <label>Watch all content in this page</label>
        </div>
      </div>
    )
  }
}

WatchModal.propTypes = {
  manageWatcher: PropTypes.func,
  isWatching: PropTypes.bool
}
WatchModal.defaultProps = {
  isWatching: false
}

export default WatchModal
