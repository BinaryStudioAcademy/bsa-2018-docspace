import * as actionTypes from './signupActionTypes'

const signupRequest = (userData) => ({
  type: actionTypes.SIGNUP_REQUESTING,
  ...userData
})

export default signupRequest
