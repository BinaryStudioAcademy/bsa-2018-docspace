import * as actionTypes from './searchActionTypes'
import { combineReducers } from 'redux'

const initialState = {
  results: [],
  isSearching: false,
  searchString: ''
}

function results (state = initialState.results, action) {
  switch (action.type) {
    case actionTypes.SEARCH_SUCCESS:
      return action.payload
    case actionTypes.CLEAN_SEARCH_RESULTS:
      return []
    default: return state
  }
}

function isSearching (state = initialState.isSearching, action) {
  switch (action.type) {
    case actionTypes.SEARCH_REQUEST:
      return true

    case actionTypes.SEARCH_SUCCESS:
    case actionTypes.SEARCH_ERROR:
      return false

    default: return state
  }
}

function searchString (state = initialState.searchString, action) {
  switch (action.type) {
    case actionTypes.SEARCH_REQUEST:
      return action.payload.input

    case actionTypes.CLEAN_SEARCH_RESULTS:
      return ''

    default: return state
  }
}

export default combineReducers({
  results,
  isSearching,
  searchString
})
