import React from 'react'
import './work.css'
import Input from '../../input'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

const Work = (props) => (
  <div className='dashboard-work' >
    <div className='work-header'>
      <h1>{props.t('Your_work')}</h1>
      <Input placeholder={props.t('filter')} className='work-filter' autoComplete={false} />
    </div>
    <div className='work-body'>
      <ul>
        <li>{props.t('Recently worked on')}</li>
        <li>{props.t('Recently visited')}</li>
        <li>{props.t('Saved for later')}</li>
      </ul>
    </div>
  </div>
)

Work.propTypes = {
  t: PropTypes.func
}

export default translate('translations')(Work)
