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

export const putLikeOnCommentRequest = (userId, page, comment) => ({
  type: actionTypes.PUT_LIKE_ON_COMMENT_REQUEST,
  payload: {
    userId: userId,
    page: page,
    comment: comment
  }
})

export const deleteLikeFromCommentRequest = (userId, page, comment) => ({
  type: actionTypes.DELETE_LIKE_FROM_COMMENT_REQUEST,
  payload: {
    userId: userId,
    page: page,
    comment: comment
  }
})
