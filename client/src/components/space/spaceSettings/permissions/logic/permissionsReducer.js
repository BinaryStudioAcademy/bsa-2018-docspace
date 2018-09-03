import * as types from './permissionsActionsTypes'
import { combineReducers } from 'redux'

const initialState = {
  byId: {},
  groups: [],
  users: [],
  anonymous: '',
  isFetching: false
}

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case types.GET_SPACE_PERMISSIONS_SUCCESS:
      return action.payload.allPermissionsById

    case types.UPDATE_SPACE_PERMISSIONS_SUCCESS:
      return {
        ...state,
        ...action.payload.updatedById
      }

    case types.ADD_USER_PERMISSIONS_SUCCESS:
    case types.ADD_GROUP_PERMISSIONS_SUCCESS:
      return {
        ...state,
        [action.payload._id]: action.payload
      }

    default: return state
  }
}

const groups = (state = initialState.groups, action) => {
  switch (action.type) {
    case types.ADD_GROUP_PERMISSIONS_SUCCESS:
      return [...state, action.payload._id]

    case types.GET_SPACE_PERMISSIONS_SUCCESS:
      return action.payload.groupsPermissionsIds

    default: return state
  }
}

const users = (state = initialState.users, action) => {
  switch (action.type) {
    case types.ADD_USER_PERMISSIONS_SUCCESS:
      return [...state, action.payload._id]

    case types.GET_SPACE_PERMISSIONS_SUCCESS:
      return action.payload.usersPermissionsIds

    default: return state
  }
}

const anonymous = (state = initialState.anonymous, action) => {
  switch (action.type) {
    case types.GET_SPACE_PERMISSIONS_SUCCESS:
      return action.payload.anonymousPermissionsId

    default: return state
  }
}

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case types.GET_SPACE_PERMISSIONS_REQUEST:
    case types.ADD_USER_PERMISSIONS_REQUEST:
    case types.ADD_GROUP_PERMISSIONS_REQUEST:
    case types.UPDATE_SPACE_PERMISSIONS_REQUEST:
      return true

    case types.GET_SPACE_PERMISSIONS_SUCCESS:
    case types.ADD_USER_PERMISSIONS_SUCCESS:
    case types.ADD_GROUP_PERMISSIONS_SUCCESS:
    case types.UPDATE_SPACE_PERMISSIONS_SUCCESS:
    case types.GET_SPACE_PERMISSIONS_ERROR:
    case types.ADD_USER_PERMISSIONS_ERROR:
    case types.ADD_GROUP_PERMISSIONS_ERROR:
    case types.UPDATE_SPACE_PERMISSIONS_ERROR:
      return false

    default: return state
  }
}

export default combineReducers({
  byId,
  groups,
  users,
  anonymous,
  isFetching
})

export const groupsPermissions = (state) => state.currentSpacePermissions.groups.map(id => state.currentSpacePermissions.byId[id])
export const usersPermissions = (state) => state.currentSpacePermissions.users.map(id => state.currentSpacePermissions.byId[id])
export const anonymousPermissions = (state) => state.currentSpacePermissions.byId[state.currentSpacePermissions.anonymous]

export const allSpacePermissionsById = (state) => state.currentSpacePermissions.byId

export const currentSpacePermissions = (state) => {
  const result = {
    groups: groupsPermissions(state),
    users: usersPermissions(state),
    anonymous: anonymousPermissions(state),
    allById: allSpacePermissionsById(state)
  }

  return result
}

export const isFetchingForPermissions = ({currentSpacePermissions}) => currentSpacePermissions.isFetching
