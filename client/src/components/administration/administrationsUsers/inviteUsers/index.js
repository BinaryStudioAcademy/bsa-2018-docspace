import React from 'react'
import Input from 'src/components/common/input'
import PropTypes from 'prop-types'

const InviteUsers = (props) => (
  <div>
    <Input label={props.t('full_name')}
      onChange={({target}) => props.onChange(target)}
      name={props.nameName}
      value={props.valueName}
      inputType='text'
    />
    <Input label={props.t('email_address')}
      onChange={({target}) => props.onChange(target)}
      name={props.nameEmail}
      value={props.valueEmail}
      inputType='text'
    />
  </div>
)

export default InviteUsers

InviteUsers.propTypes = {
  onChange: PropTypes.func,
  nameName: PropTypes.string,
  valueName: PropTypes.string,
  nameEmail: PropTypes.string,
  valueEmail: PropTypes.string,
  t: PropTypes.func
}
