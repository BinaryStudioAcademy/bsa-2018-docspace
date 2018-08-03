import * as actionTypes from './signupActionTypes'

const signupRequest = ({ email, fullName, password }) => ({
  type: actionTypes.SIGNUP_REQUESTING,
  email,
  fullName,
  password
})

export default signupRequest
