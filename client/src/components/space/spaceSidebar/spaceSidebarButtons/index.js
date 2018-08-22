import React from 'react'
import PropTypes from 'prop-types'

import Button from 'src/components/dashboard/sidebar/button'
import spaceLogo from 'src/resources/logo.png'
import './spaceSidebarButtons.css'

const SpaceSidebarButtons = (props) => {
  const { spaceId } = props

  return (
    <div className='full-sidebar'>
      <div className='logo'>
        <img src={spaceLogo} alt='space logo' />
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
        path={`/spaces/${spaceId}/settings`}
        type='minimize-button'
        icon='fas fa-cog'
      />
    </div>
  )
}

SpaceSidebarButtons.propTypes = {
  spaceId: PropTypes.string
}

SpaceSidebarButtons.defaultProps = {
  spaceId: ''
}

export default SpaceSidebarButtons
