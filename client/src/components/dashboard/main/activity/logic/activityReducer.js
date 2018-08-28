import * as actionTypes from './activityActionTypes'
import { combineReducers } from 'redux'

const initialState = {
  requesting: false,
  successful: false,
  allUpdates: [],
  currentUserUpdates: []
}

const allHistory = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_UPDATES_SUCCESS:
      return {
        requesting: false,
        successful: true,
        allUpdates: action.allUserHistory
      }
    case actionTypes.GET_ALL_UPDATES_ERROR:
      return {
        requesting: false,
        allUpdates: [],
        successful: false
      }
    default:
      return state
  }
}

const currentUserHistory = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER_UPDATES_SUCCESS:
      return {
        requesting: false,
        successful: true,
        currentUserUpdates: action.currentUserHistory
      }
    case actionTypes.GET_CURRENT_USER_UPDATES_ERROR:
      return {
        requesting: false,
        successful: false,
        currentUserUpdates: []
      }
    default:
      return state
  }
}

export default combineReducers({
  allHistory,
  currentUserHistory
})
