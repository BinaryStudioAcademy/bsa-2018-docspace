import * as actionsTypes from './permissionsActionsTypes'

export const getSpacePermissionsRequest = (spaceId) => ({
  type: actionsTypes.GET_SPACE_PERMISSIONS_REQUEST,
  payload: { spaceId }
})

export const getSpacePermissionsSuccess = (normalizedPermissions) => ({
  type: actionsTypes.GET_SPACE_PERMISSIONS_SUCCESS,
  payload: normalizedPermissions
})

export const getSpacePermissionsError = (err) => ({
  type: actionsTypes.GET_SPACE_PERMISSIONS_ERROR,
  payload: err
})

// UPDATE MANY
export const updateSpacePermissionsRequest = (spacePermissionsArr, spaceId) => ({
  type: actionsTypes.UPDATE_SPACE_PERMISSIONS_REQUEST,
  payload: spacePermissionsArr,
  spaceId
})

export const updateSpacePermissionsSuccess = (updatedById, spaceId) => ({
  type: actionsTypes.UPDATE_SPACE_PERMISSIONS_SUCCESS,
  payload: { updatedById },
  spaceId
})

export const updateSpacePermissionsError = (error) => ({
  type: actionsTypes.UPDATE_SPACE_PERMISSIONS_ERROR,
  payload: error
})

// USERS PERMISSIONS
export const addUserPermissionsRequest = (targetUser, spaceId) => ({
  type: actionsTypes.ADD_USER_PERMISSIONS_REQUEST,
  payload: { userId: targetUser._id, spaceId: spaceId },
  user: targetUser
})

export const addUserPermissionsSuccess = (permissions) => ({
  type: actionsTypes.ADD_USER_PERMISSIONS_SUCCESS,
  payload: permissions
})

export const addUserPermissionsError = (err) => ({
  type: actionsTypes.ADD_USER_PERMISSIONS_ERROR,
  payload: err
})

// GROUPS PERMISSIONS
export const addGroupPermissionsRequest = (targetGroup, spaceId) => ({
  type: actionsTypes.ADD_GROUP_PERMISSIONS_REQUEST,
  payload: { groupId: targetGroup._id, spaceId },
  group: targetGroup
})

export const addGroupPermissionsSuccess = (permissions) => ({
  type: actionsTypes.ADD_GROUP_PERMISSIONS_SUCCESS,
  payload: permissions
})

export const addGroupPermissionsError = (err) => ({
  type: actionsTypes.ADD_GROUP_PERMISSIONS_ERROR,
  payload: err
})

export const RefreshAuthUserPermissions = (spaceId, permissions) => ({
  type: actionsTypes.REFRESH_AUTH_USER_PERMISSIONS,
  payload: { spaceId, permissions }
})
