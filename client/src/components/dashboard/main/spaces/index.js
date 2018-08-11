import React from 'react'
import './spaces.css'
import Button from '../../button'
import DashboardSpacesBody from '../../spacesBody'

const Spaces = () => (
  <div className={'dashboard__container'} >
    <div className={'dashboard__content__spaces'}>
      <div className={'spaces__header'}>
        <h2>Space Directory</h2><Button content='Create Space' />
      </div>
      <DashboardSpacesBody />
    </div>
  </div>
)

export default Spaces
