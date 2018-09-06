import * as actionTypes from './searchActionTypes'
import { combineReducers } from 'redux'

const initialState = {
  results: [],
  isSearching: false,
  isAdvancedSearching: false,
  searchString: '',
  advancedResults: {}
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

function isAdvancedSearching (state = initialState.isAdvancedSearching, action) {
  switch (action.type) {
    case actionTypes.ADVANCED_SEARCH_REQUEST:
      return true

    case actionTypes.ADVANCED_SEARCH_SUCCESS:
    case actionTypes.ADVANCED_SEARCH_ERROR:
      return false

    default: return state
  }
}

function searchString (state = initialState.searchString, action) {
  switch (action.type) {
    case actionTypes.ADVANCED_SEARCH_REQUEST:
      return action.payload.input

    case actionTypes.CLEAN_ADVANCED_SEARCH_RESULTS:
      return ''

    default: return state
  }
}

function advancedResults (state = initialState.advancedResults, action) {
  switch (action.type) {
    case actionTypes.ADVANCED_SEARCH_SUCCESS:
      return action.payload

    case actionTypes.CLEAN_ADVANCED_SEARCH_RESULTS:
      return {}
    default: return state
  }
}

export default combineReducers({
  results,
  isSearching,
  searchString,
  advancedResults,
  isAdvancedSearching
})
