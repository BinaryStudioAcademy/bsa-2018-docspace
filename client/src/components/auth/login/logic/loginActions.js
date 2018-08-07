import * as actionTypes from './loginActionTypes'

const loginRequest = (userData) => {
  return ({
    type: actionTypes.LOGIN_REQUESTING,
    ...userData
  })
}

export default loginRequest
