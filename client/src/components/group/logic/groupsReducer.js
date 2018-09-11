import * as actionTypes from './groupsActionsTypes'
import { combineReducers } from 'redux'

const initialState = []

function results (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_GROUPS_SUCCESS:
      return action.payload
    case actionTypes.CREATE_GROUP_SUCCESS:
      return [ ...state, action.payload ]
    case actionTypes.GET_GROUP_SUCCESS:
    case actionTypes.UPDATE_GROUP_SUCCESS:
      return action.payload
    case actionTypes.DELETE_GROUP_SUCCESS:
      return state.filter(group => group._id !== action.payload._id)
    default: return state
  }
}

function isFetching (state = false, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_GROUPS_REQUEST:
    case actionTypes.GET_GROUP_REQUEST:
    case actionTypes.CREATE_GROUP_REQUEST:
    case actionTypes.UPDATE_GROUP_REQUEST:
      return true
    case actionTypes.GET_ALL_GROUPS_SUCCESS:
    case actionTypes.GET_GROUP_SUCCESS:
    case actionTypes.CREATE_GROUP_SUCCESS:
    case actionTypes.UPDATE_GROUP_SUCCESS:
      return false
    default: return state
  }
}

export default combineReducers({
  results,
  isFetching
})
