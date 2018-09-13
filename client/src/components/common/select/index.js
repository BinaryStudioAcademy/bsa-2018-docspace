import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import './select.css'
const Select = ({t, selectValue, onChange, options, noneOption, selectName, noneOptionValue, reference}) => (
  <React.Fragment>
    <div className='select'>
      <select ref={reference} defaultValue={selectValue} onChange={({target}) => onChange(target)} name={selectName} id='slct'>
        {noneOption ? <option value='none' disabled hidden> {noneOptionValue ? t(noneOptionValue) : t('choose_here')} </option> : null}
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
  noneOption: PropTypes.bool,
  selectName: PropTypes.string,
  reference: PropTypes.object,
  noneOptionValue: PropTypes.string
}
export default translate('translations')(Select)
