import * as actionTypes from './setNewPassActionTypes'

const setNewPassRequest = (userData) => {
  return ({
    type: actionTypes.VALID_LINK_REQUEST,
    ...userData
  })
}

export default setNewPassRequest
