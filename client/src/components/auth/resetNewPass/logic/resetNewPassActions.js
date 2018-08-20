import * as actionTypes from './resetNewPassActionTypes'

const resetNewPassRequest = (userData) => {
  return ({
    type: actionTypes.VALID_LINK_REQUEST,
    ...userData
  })
}

export default resetNewPassRequest
