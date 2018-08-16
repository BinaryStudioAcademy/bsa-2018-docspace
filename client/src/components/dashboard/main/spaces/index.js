import React from 'react'
import './spaces.css'
import Button from '../../button'
import DashboardSpacesBody from '../../spacesBody'

const Spaces = () => (
  <div className={'dashboard-spaces'}>
    <div className={'spaces-header'}>
      <h1>Space Directory</h1>
      <Button content='Create Space' />
    </div>
    <DashboardSpacesBody />
  </div>
)

export default Spaces
