import * as actionTypes from './groupsActionsTypes'

// POST
export const createGroupRequest = (group) => ({
  type: actionTypes.CREATE_GROUP_REQUEST,
  payload: group
})
export const createGroupSuccess = (group) => ({
  type: actionTypes.CREATE_GROUP_SUCCESS,
  payload: group
})

export const createGroupError = () => ({
  type: actionTypes.CREATE_GROUP_ERROR
})
