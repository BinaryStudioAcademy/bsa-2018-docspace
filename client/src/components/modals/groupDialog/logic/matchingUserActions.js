import * as actionTypes from './matchingUserActionsType'

export const getAllUserGroupsRequest = (keyword) => ({
  type: actionTypes.GET_MATCHING_USERS_REQUEST,
  payload: keyword
})
export const getAllUserGroupsSuccess = (users) => ({
  type: actionTypes.GET_MATCHING_USERS_SUCCESS,
  payload: users
})
export const getAllUserGroupsError = () => ({
  type: actionTypes.GET_MATCHING_USERS_ERROR
})

export const cleanMatchingUser = () => ({
  type: actionTypes.CLEAN_MATCHING_USERS
})
