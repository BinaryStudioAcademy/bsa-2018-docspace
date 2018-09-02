import * as actionTypes from './allUsersActionType'

export const getAlUsersRequest = () => ({
  type: actionTypes.GET_ALL_USERS_REQUEST
})

export const getAllUsersSuccess = (users) => ({
  type: actionTypes.GET_ALL_USERS_SUCCESS,
  payload: users
})
