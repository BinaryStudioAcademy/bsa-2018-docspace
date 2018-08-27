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

export const getGroupRequest = (id) => ({
  type: actionTypes.GET_GROUP_REQUEST,
  payload: id
})
export const getGroupSuccess = (group) => ({
  type: actionTypes.GET_GROUP_SUCCESS,
  payload: group
})

export const getGroupError = () => ({
  type: actionTypes.GET_GROUP_ERROR
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

// UPDATE
export const updateGroupRequest = (newGroup) => ({
  type: actionTypes.UPDATE_GROUP_REQUEST,
  payload: newGroup
})
export const updateGroupSuccess = (group) => ({
  type: actionTypes.UPDATE_GROUP_SUCCESS,
  payload: group
})

export const updateGroupError = () => ({
  type: actionTypes.UPDATE_GROUP_ERROR
})

// DELETE
export const deleteGroupRequest = (newGroup) => ({
  type: actionTypes.DELETE_GROUP_REQUEST,
  payload: newGroup
})
export const deleteGroupSuccess = (group) => ({
  type: actionTypes.DELETE_GROUP_SUCCESS,
  payload: group
})

export const deleteGroupError = () => ({
  type: actionTypes.DELETE_GROUP_ERROR
})
