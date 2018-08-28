import * as commentsActionTypes from './commentsActionTypes'

// GET
export const getAllCommentsRequest = (commentsId) => ({
  type: commentsActionTypes.GET_ALL_COMMENTS_REQUEST,
  payload: {
    commentsId: commentsId
  }
})

export const allCommentsFetched = (comments) => {
  const commentsWithCorrectTime = comments.map((comment) => {
    comment.createdAt = new Date(comment.createdAt)

    return comment
  })

  return {
    type: commentsActionTypes.GET_ALL_COMMENTS_SUCCESS,
    payload: {
      comments: commentsWithCorrectTime
    }
  }
}

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

export const addCommentSuccessfully = (comment) => {
  const commentWithCorrectTime = comment

  commentWithCorrectTime.createdAt = new Date(comment.createdAt)

  return {
    type: commentsActionTypes.CREATE_COMMENT_SUCCESS,
    payload: {
      comment: commentWithCorrectTime
    }
  }
}

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
