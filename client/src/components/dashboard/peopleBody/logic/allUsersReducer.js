import * as actionTypes from './allUsersActionType'
import { combineReducers } from 'redux'

const initialState = []

function results (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return action.payload
    default: return state
  }
}

function isFetching (state = false, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS_REQUEST:
      return true
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return false
    default: return state
  }
}

export default combineReducers({
  results,
  isFetching
})
