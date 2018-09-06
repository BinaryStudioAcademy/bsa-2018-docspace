import React from 'react'
import './work.css'
import Input from '../../input'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

const Work = (props) => (
  <div className='dashboard-work' >
    <div className='work-header'>
      <h1>{props.t('your_work')}</h1>
      <Input placeholder={props.t('filter')} className='work-filter' autoComplete={false} />
    </div>
    <div className='work-body'>
      <ul>
        <li>{props.t('recently_worked_on')}</li>
        <li>{props.t('recently_visited')}</li>
        <li>{props.t('saved_for_later')}</li>
      </ul>
    </div>
  </div>
)

Work.propTypes = {
  t: PropTypes.func
}

export default translate('translations')(Work)
