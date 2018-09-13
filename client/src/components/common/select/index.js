import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import './select.css'
const Select = ({t, selectValue, onChange, options, noneOption}) => (
  <React.Fragment>
    <div className='select'>
      <select defaultValue={selectValue} onChange={onChange} name='slct' id='slct'>
        {noneOption ? <option value='none' disabled hidden> {t('none')} </option> : null}
        {options.map((option, index) => <option key={index} value={option.value}>{t(option.showValue)}</option>)}
      </select>
    </div>
  </React.Fragment>
)
Select.propTypes = {
  t: PropTypes.func,
  selectValue: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  noneOption: PropTypes.bool
}
export default translate('translations')(Select)
