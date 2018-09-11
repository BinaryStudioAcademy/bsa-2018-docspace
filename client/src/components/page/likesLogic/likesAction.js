import * as actionTypes from './likesActionTypes'

export const putLikeOnPageRequest = (user, page) => ({
  type: actionTypes.PUT_LIKE_ON_PAGE_REQUEST,
  payload: {user, page}
})

export const putLikeOnPageSuccess = (page, likedUser) => ({
  type: actionTypes.PUT_LIKE_ON_PAGE_SUCCESS,
  payload: {page, likedUser}
})

export const putLikeOnPageError = () => ({
  type: actionTypes.PUT_LIKE_ON_PAGE_ERROR
})

export const deleteLikeFromPageRequest = (user, page) => ({
  type: actionTypes.DELETE_LIKE_FROM_PAGE_REQUEST,
  payload: {user, page}
})

export const deleteLikeFromPageSuccess = (page, unlikedUser) => ({
  type: actionTypes.DELETE_LIKE_FROM_PAGE_SUCCESS,
  payload: {page, unlikedUser}
})

export const deleteLikeFromPageError = () => ({
  type: actionTypes.DELETE_LIKE_FROM_PAGE_ERROR
})

export const putLikeOnCommentSuccess = (page, editedComment) => {
  editedComment.createdAt = new Date(editedComment.createdAt)
  return {
    type: actionTypes.PUT_LIKE_ON_COMMENT_SUCCESS,
    payload: {page, editedComment}
  }
}

export const deleteLikeFromCommentSuccess = (page, editedComment) => {
  editedComment.createdAt = new Date(editedComment.createdAt)
  return {
    type: actionTypes.DELETE_LIKE_FROM_COMMENT_SUCCESS,
    payload: {page, editedComment}
  }
}

export const putLikeOnCommentRequest = (userId, page, comment) => ({
  type: actionTypes.PUT_LIKE_ON_COMMENT_REQUEST,
  payload: {userId, page, comment}
})

export const deleteLikeFromCommentRequest = (userId, page, comment) => ({
  type: actionTypes.DELETE_LIKE_FROM_COMMENT_REQUEST,
  payload: {userId, page, comment}
})
