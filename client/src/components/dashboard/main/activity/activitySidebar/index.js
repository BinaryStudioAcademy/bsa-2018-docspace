import React, { Component } from 'react'
import './avtivitySidebar.css'
import welcome from './welcome.png'
import CreateSpaceButton from 'src/components/common/createSpaceButton'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

class ActivitySidebar extends Component {
  render () {
    const {t} = this.props
    return (
      <div className='dashboard-content-side' >
        <div className='side-header'>
          <CreateSpaceButton />
        </div>
        <div className='side-main'>
          <h2>{t('welcome_to_docspace')}</h2>
          <img src={welcome} alt='' />
          <p>{t('docspace_intro')}</p>
        </div>
      </div>
    )
  }
}

ActivitySidebar.propTypes = {
  t: PropTypes.func
}

export default translate('translations')(ActivitySidebar)
