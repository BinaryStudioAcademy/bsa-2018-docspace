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
  payload: {comment, page}
})

export const addCommentToPageSuccess = (page, newComment) => {
  newComment.createdAt = new Date(newComment.createdAt)

  return {
    type: commentsActionTypes.CREATE_COMMENT_SUCCESS,
    payload: {page, newComment}
  }
}

export const addCommentFailure = () => ({
  type: commentsActionTypes.CREATE_COMMENT_ERROR
})

// EDIT
export const editCommentRequest = (comment, page) => ({
  type: commentsActionTypes.EDIT_COMMENT_REQUEST,
  payload: {comment, page}
})

export const editCommentSuccess = (page, editedComment) => ({
  type: commentsActionTypes.EDIT_COMMENT_SUCCESS,
  payload: {page, editedComment}
})

export const editCommentFailure = () => ({
  type: commentsActionTypes.EDIT_COMMENT_ERROR
})

// DELETE
export const deleteCommentRequest = (comment, page) => ({
  type: commentsActionTypes.DELETE_COMMENT_REQUEST,
  payload: {comment, page}
})

export const deleteCommentSuccess = (page, deletedComment) => ({
  type: commentsActionTypes.DELETE_COMMENT_SUCCESS,
  payload: {page, deletedComment}
})

export const deleteCommentFailure = () => ({
  type: commentsActionTypes.DELETE_COMMENT_ERROR
})
