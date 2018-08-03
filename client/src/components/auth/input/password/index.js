import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './password.css'

const Password = (props) => {
  return (
    <Fragment>
      <input type='password' className='auth__input password' onChange={props.passChange}
        autoComplete='false' disabled={props.disabled} value={props.passValue} placeholder={props.label} />
      <span />
      <p className='password_complexity'>{props.complexity}</p>
    </Fragment>
  )
}

Password.propTypes = {
  passChange: PropTypes.func,
  disabled: PropTypes.bool,
  passValue: PropTypes.string,
  complexity: PropTypes.string,
  label: PropTypes.string
}

export default Password
