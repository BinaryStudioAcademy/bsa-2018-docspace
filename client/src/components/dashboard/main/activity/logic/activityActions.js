import * as actionTypes from './activityActionTypes'

export const getAllUserUpdatesRequest = () => ({
  type: actionTypes.GET_ALL_UPDATES_REQUEST
})

export const getCurrentUserUpdatesRequest = (userId) => ({
  type: actionTypes.GET_CURRENT_USER_UPDATES_REQUEST,
  payload: { userId }
})
