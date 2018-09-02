import * as actionTypes from './searchActionType'

export const getMatchingPagesRequest = (keyword) => ({
  type: actionTypes.GET_MATCHING_PAGES_REQUEST,
  payload: keyword
})
export const getMatchingPagesSuccess = (results) => ({
  type: actionTypes.GET_MATCHING_PAGES_SUCCESS,
  payload: results
})
export const getMatchingPagesError = () => ({
  type: actionTypes.GET_MATCHING_PAGES_ERROR
})

export const cleanMatchingPages = () => ({
  type: actionTypes.CLEAN_MATCHING_PAGES
})
