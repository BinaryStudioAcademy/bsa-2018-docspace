import * as actionTypes from './searchActionTypes'

export const searchRequest = (searchObject) => ({
  type: actionTypes.SEARCH_REQUEST,
  payload: searchObject
})
export const searchSuccess = (results) => ({
  type: actionTypes.SEARCH_SUCCESS,
  payload: results
})
export const searchError = (error) => ({
  type: actionTypes.SEARCH_ERROR,
  payload: error
})

export const cleanSearchResults = () => ({
  type: actionTypes.CLEAN_SEARCH_RESULTS
})
