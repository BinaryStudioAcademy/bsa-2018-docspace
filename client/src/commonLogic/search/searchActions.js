import * as actionTypes from './searchActionTypes'

export const searchRequest = (searchObject, isAdvanced = false) => ({
  type: actionTypes.SEARCH_REQUEST,
  payload: searchObject,
  isAdvanced
})

export const searchSuccess = (results, isAdvanced = false) => ({
  type: actionTypes.SEARCH_SUCCESS,
  payload: results,
  isAdvanced
})

export const searchError = (error) => ({
  type: actionTypes.SEARCH_ERROR,
  payload: error
})

export const cleanSearchResults = () => ({
  type: actionTypes.CLEAN_SEARCH_RESULTS
})

export const advancedSearchRequest = (searchObject) => ({
  type: actionTypes.ADVANCED_SEARCH_REQUEST,
  payload: searchObject
})

export const advancedSearchSuccess = (results) => ({
  type: actionTypes.ADVANCED_SEARCH_SUCCESS,
  payload: results
})

export const advancedSearchError = (error) => ({
  type: actionTypes.ADVANCED_SEARCH_ERROR,
  payload: error
})

export const cleanAdvancedSearchResults = () => ({
  type: actionTypes.CLEAN_ADVANCED_SEARCH_RESULTS
})
