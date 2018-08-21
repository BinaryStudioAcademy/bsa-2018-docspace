import * as actionTypes from './activityActionTypes'

export const getAllUserUpdatesRequest = (userId) => ({
  type: actionTypes.GET_ALL_UPDATES_REQUEST,
  payload: userId
})
