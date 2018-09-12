import React from 'react'
import PropTypes from 'prop-types'

import Button from 'src/components/dashboard/sidebar/button'
import {lightColors} from 'src/components/iconColorPicker/defaultColors'
import './spaceSidebarButtons.css'

const SpaceSidebarButtons = (props) => {
  const { spaceId, spaceSettings } = props
  const icon = spaceSettings ? spaceSettings.icon : 'folder'
  const color = spaceSettings ? spaceSettings.color : '#1c80ff'
  const iconColorIsWhite = lightColors.some(bgcolor => bgcolor === color)
  return (
    <div className='full-sidebar'>
      <div className='space-sidebar-header-icon logo' style={{backgroundColor: color, color: iconColorIsWhite ? 'grey' : 'white'}}>
        <i className={`fa fa-${icon}`} />
      </div>
      <Button
        path={`/spaces/${spaceId}/overview`}
        type='minimize-button'
        icon='fas fa-stream'
      />
      <Button
        path={`/spaces/${spaceId}/blog`}
        type='minimize-button'
        icon='fas fa-quote-right'
      />
      <Button
        path={`/spaces/${spaceId}/settings/overview`}
        type='minimize-button'
        icon='fas fa-cog'
      />
    </div>
  )
}

SpaceSidebarButtons.propTypes = {
  spaceId: PropTypes.string,
  spaceSettings: PropTypes.object
}

SpaceSidebarButtons.defaultProps = {
  spaceId: ''
}

export default SpaceSidebarButtons
