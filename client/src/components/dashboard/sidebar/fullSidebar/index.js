import Button from '../button'
import React, {PureComponent} from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import './fullSidebar.css'

class FullSidebar extends PureComponent {
  render () {
    const { t } = this.props
    const navButtonClass = this.props.showLabels ? 'full-button' : 'minimize-button'

    return (
      <div className='full-sidebar'>
        {this.props.showLabels && <NavLink to={'/spacedirectory'}><h1 className='docspace-logo-label'> docspace </h1></NavLink>}
        {
          this.props.showIcons && (
            <React.Fragment>
              <Button
                title={this.props.showLabels ? t('activity') : null}
                path='/activity' type={navButtonClass}
                icon='fa fa-compass'
              />
              <Button
                title={this.props.showLabels ? t('your_work') : null}
                path='/works' type={navButtonClass}
                icon='fa fa-clipboard'
              />
              <Button
                title={this.props.showLabels ? t('spaces') : null}
                path='/spacedirectory' type={navButtonClass}
                icon='fa fa-folder'
              />
              <Button
                title={this.props.showLabels ? t('people') : null}
                path='/people' type={navButtonClass}
                icon='fa fa-users'
              />
            </React.Fragment>
          )
        }
      </div>
    )
  }
}
FullSidebar.propTypes = {
  showIcons: PropTypes.bool,
  showLabels: PropTypes.bool,
  t: PropTypes.func
}
export default translate('translations')(FullSidebar)
