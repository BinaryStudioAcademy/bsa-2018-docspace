import Button from '../button'
import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import './fullSidebar.css'

class FullSidebar extends Component {
  renderButtons () {
    const {t} = this.props
    const navButtonClass = this.props.showLabels ? 'full-button' : 'minimize-button'
    return <div className='tabs-wrapper'>
      {this.props.showLabels && <NavLink to={'/spacedirectory'}><h1 id='docspace-logo-label'> docspace </h1></NavLink>}
      <Button
        title={this.props.showLabels && t('Activity')}
        path='/activity' type={navButtonClass}
        icon='fa fa-compass'
      />
      <Button
        title={this.props.showLabels && t('Your_work')}
        path='/works' type={navButtonClass}
        icon='fa  fa-clipboard'
      />
      <Button
        title={this.props.showLabels && t('Spaces')}
        path='/spacedirectory' type={navButtonClass}
        icon='fa fa-folder'
      />
      <Button
        title={this.props.showLabels && t('People')}
        path='/people' type={navButtonClass}
        icon='fa fa-users'
      />
      <Button
        title={this.props.showLabels && t('Settings')}
        path='/settings'
        type={navButtonClass}
        icon='fa fa-cog'
      />
    </div>
  }

  renderRightSidebarContent () {
    if (this.props.showIcons) {
      return this.renderButtons()
    }
  }

  render () {
    return (
      <React.Fragment>
        {this.renderRightSidebarContent()}
      </React.Fragment>
    )
  }
}
FullSidebar.propTypes = {
  showIcons: PropTypes.bool,
  showLabels: PropTypes.bool,
  t: PropTypes.func
}
export default translate('translations')(FullSidebar)
