import * as actionTypes from './setNewPasswordActionTypes'

const setNewPasswordRequest = (userData) => {
  return ({
    type: actionTypes.VALID_LINK_REQUEST,
    ...userData
  })
}

export default setNewPasswordRequest
