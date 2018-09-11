import * as actionTypes from './resetActionTypes'

const resetRequest = (userData) => ({
  type: actionTypes.RESET_REQUESTING,
  ...userData
})

export default resetRequest
