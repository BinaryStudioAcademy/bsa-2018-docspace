import * as types from './searchActionsTypes'

export const searchRequest = (searchQueryObject) => ({
  type: types.SEARCH_REQUEST,
  payload: searchQueryObject
})

export const searchSuccess = (result) => ({
  type: types.SEARCH_SUCCESS,
  payload: result
})

export const searchError = (err) => ({
  type: types.SEARCH_ERROR,
  payload: err
})
