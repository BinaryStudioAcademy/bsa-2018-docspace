import * as actionTypes from './signupActionTypes'

const signupRequest = ({ email, password }) => ({
  type: actionTypes.SIGNUP_REQUESTING,
  email,
  password
})

export default signupRequest
