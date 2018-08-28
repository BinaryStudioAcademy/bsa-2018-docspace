import React from 'react'
import Input from 'src/components/common/input'
import PropTypes from 'prop-types'

const InviteUsers = (props) => (
  <div>
    <Input label='Full name'
      onChange={({target}) => props.onChange(target)}
      name={props.nameName}
      value={props.valueName}
      inputType='text'
    />
    <Input label='Email address'
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
  valueEmail: PropTypes.string
}
