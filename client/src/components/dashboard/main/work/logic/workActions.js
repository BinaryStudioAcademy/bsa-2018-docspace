import * as actionTypes from './workActionTypes'

export const getUserWorksRequest = (userId) => ({
  type: actionTypes.GET_USER_WORKS_REQUEST,
  payload: { userId }
})
