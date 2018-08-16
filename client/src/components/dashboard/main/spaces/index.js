import React from 'react'
import DashboardSpacesBody from '../../spacesBody'
import CreateSpaceButton from 'src/components/common/createSpaceButton'

import './spaces.css'

const Spaces = () => (
  <div className={'dashboard-spaces'}>
    <div className={'spaces-header'}>
      <h1>Space Directory</h1>
      <CreateSpaceButton />
    </div>
    <DashboardSpacesBody />
  </div>
)

export default Spaces
