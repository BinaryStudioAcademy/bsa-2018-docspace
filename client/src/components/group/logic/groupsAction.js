import * as actionTypes from './groupsActionsTypes'

// GET
export const getAllUserGroupsRequest = (user) => ({
  type: actionTypes.GET_ALL_GROUPS_REQUEST,
  payload: user
})
export const getAllUserGroupsSuccess = (groups) => ({
  type: actionTypes.GET_ALL_GROUPS_SUCCESS,
  payload: groups
})

export const getAllUserGroupsError = () => ({
  type: actionTypes.GET_ALL_GROUPS_ERROR
})

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
