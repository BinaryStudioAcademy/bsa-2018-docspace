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
export const updateSpacePermissionsRequest = (spacePermissionsArr) => ({
  type: actionsTypes.UPDATE_SPACE_PERMISSIONS_REQUEST,
  payload: spacePermissionsArr
})

export const updateSpacePermissionsSuccess = (updatedById) => ({
  type: actionsTypes.UPDATE_SPACE_PERMISSIONS_SUCCESS,
  payload: { updatedById }
})

export const updateSpacePermissionsError = (error) => ({
  type: actionsTypes.UPDATE_SPACE_PERMISSIONS_ERROR,
  payload: error
})

// USERS PERMISSIONS
export const addUserPermissionsRequest = (permissionsObj) => ({
  type: actionsTypes.ADD_USER_PERMISSIONS_REQUEST,
  payload: permissionsObj
})

export const addUserPermissionsSuccess = (permissions) => ({
  type: actionsTypes.ADD_USER_PERMISSIONS_REQUEST,
  payload: permissions
})

export const addUserPermissionsError = (err) => ({
  type: actionsTypes.ADD_USER_PERMISSIONS_ERROR,
  payload: err
})

// GROUPS PERMISSIONS
export const addGroupPermissionsRequest = (permissionsObj) => ({
  type: actionsTypes.ADD_GROUP_PERMISSIONS_REQUEST,
  payload: permissionsObj
})

export const addGroupPermissionsSuccess = (permissions) => ({
  type: actionsTypes.ADD_GROUP_PERMISSIONS_REQUEST,
  payload: permissions
})

export const addGroupPermissionsError = (err) => ({
  type: actionsTypes.ADD_GROUP_PERMISSIONS_ERROR,
  payload: err
})

// ANONYMOUS PERMISSIONS
export const addAnonymousPermissionsRequest = (permissionsObj) => ({
  type: actionsTypes.ADD_ANONYMOUS_PERMISSIONS_REQUEST,
  payload: permissionsObj
})

export const addAnonymousPermissionsSuccess = (permissions) => ({
  type: actionsTypes.ADD_ANONYMOUS_PERMISSIONS_REQUEST,
  payload: permissions
})

export const addAnonymousPermissionsError = (err) => ({
  type: actionsTypes.ADD_ANONYMOUS_PERMISSIONS_ERROR,
  payload: err
})
