import * as actionTypes from './likesActionTypes'

export const putLikeRequest = (userId, page) => ({
  type: actionTypes.PUT_LIKE_REQUEST,
  payload: {
    userId: userId,
    page: page
  }
})

export const putLikeSuccess = (page) => ({
  type: actionTypes.PUT_LIKE_SUCCESS,
  payload: page
})

export const deleteLikeRequest = (userId, page) => ({
  type: actionTypes.DELETE_LIKE_REQUEST,
  payload: {
    userId: userId,
    page: page
  }
})

export const deleteLikeSuccess = (page) => ({
  type: actionTypes.DELETE_LIKE_SUCCESS,
  payload: page
})
