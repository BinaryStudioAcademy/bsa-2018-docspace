import React, { Component } from 'react'
import './dashboardSpaces.css'
import Button from '../button'
import DashboardSpacesBody from '../spacesBody'
class DashboardSpaces extends Component {
  render () {
    return (
      <div className={'dashboard__container'} >
        <div className={'dashboard__content__spaces'}>
          <div className={'spaces__header'}>
            <h2>Space Directory</h2><Button content='Create Space' />
          </div>
          <DashboardSpacesBody />
        </div>
      </div>
    )
  }
}
export default DashboardSpaces
