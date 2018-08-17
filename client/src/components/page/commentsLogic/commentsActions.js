import * as commentsActionTypes from './commentsActionTypes'

// GET
export const getAllCommentsRequest = (commentsId) => ({
  type: commentsActionTypes.GET_ALL_COMMENTS_REQUEST,
  payload: {
    commentsId: commentsId
  }
})

export const allCommentsFetched = (comments) => ({
  type: commentsActionTypes.GET_ALL_COMMENTS_SUCCESS,
  payload: {
    comments: comments
  }
})

export const getAllCommentsFailure = () => ({
  type: commentsActionTypes.GET_ALL_COMMENTS_ERROR
})

// POST

export const addCommentRequest = (comment, page) => ({
  type: commentsActionTypes.CREATE_COMMENT_REQUEST,
  payload: {
    comment: comment,
    page: page
  }
})

export const addCommentSuccessfully = (comment) => ({
  type: commentsActionTypes.CREATE_COMMENT_SUCCESS,
  payload: {
    comment: comment
  }
})

export const addCommentFailure = () => ({
  type: commentsActionTypes.CREATE_COMMENT_ERROR
})

// EDIT
export const editCommentRequest = (comment, page) => ({
  type: commentsActionTypes.EDIT_COMMENT_REQUEST,
  payload: {
    comment: comment,
    page: page
  }
})

export const editCommentSuccessfully = () => ({
  type: commentsActionTypes.EDIT_COMMENT_SUCCESS
})

export const editCommentFailure = () => ({
  type: commentsActionTypes.EDIT_COMMENT_ERROR
})

// DELETE
export const deleteCommentRequest = (comment, page) => ({
  type: commentsActionTypes.DELETE_COMMENT_REQUEST,
  payload: {
    comment: comment,
    page: page
  }
})

export const deleteCommentSuccessfully = () => ({
  type: commentsActionTypes.DELETE_COMMENT_SUCCESS
})

export const deleteCommentFailure = () => ({
  type: commentsActionTypes.DELETE_COMMENT_ERROR
})