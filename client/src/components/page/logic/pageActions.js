import * as actionTypes from './pageActionTypes'

// GET
export const getPagesRequest = () => ({
  type: actionTypes.GET_ALL_PAGES_REQUEST
})

export const allPagesFetchedAndNormalized = (all, byId) => ({
  type: actionTypes.GET_ALL_PAGES_SUCCESS,
  payload: {
    all: all,
    byId: byId
  }
})

export const getAllPagesError = () => ({
  type: actionTypes.GET_ALL_PAGES_ERROR
})

// GET ONE
export const getPageByIdRequest = (id) => ({
  type: actionTypes.GET_PAGE_BY_ID_REQUEST,
  payload: id
})

export const getPageByIdSuccess = (page) => ({
  type: actionTypes.GET_PAGE_BY_ID_SUCCESS,
  payload: page
})

export const getPageByIdError = () => ({
  type: actionTypes.GET_PAGE_BY_ID_ERROR
})

// POST
export const createPageRequest = (page) => ({
  type: actionTypes.CREATE_PAGE_REQUEST,
  payload: page
})

export const createPageSuccess = (page) => ({
  type: actionTypes.CREATE_PAGE_SUCCESS,
  payload: page
})

export const createPageError = () => ({
  type: actionTypes.CREATE_PAGE_ERROR
})

// UPDATE
export const updatePageRequest = (newPage) => ({
  type: actionTypes.UPDATE_PAGE_REQUEST,
  payload: newPage
})

export const updatePageSuccess = (updatedPage) => {
  const pageWithCorrectCommentTime = updatedPage

  pageWithCorrectCommentTime.commentsArr = updatedPage.commentsArr.map((comment) => {
    comment.createdAt = new Date(comment.createdAt)

    return comment
  })

  return {
    type: actionTypes.UPDATE_PAGE_SUCCESS,
    payload: pageWithCorrectCommentTime
  }
}

export const updatePageError = () => ({
  type: actionTypes.UPDATE_PAGE_ERROR
})

// DELETE
export const deletePageRequest = (page) => ({
  type: actionTypes.DELETE_PAGE_REQUEST,
  payload: { ...page }
})

export const deletePageSuccess = (deletedPage) => ({
  type: actionTypes.DELETE_PAGE_SUCCESS,
  payload: deletedPage
})

export const deletePageError = () => ({
  type: actionTypes.DELETE_PAGE_ERROR
})

// CANCEL REQUST INDICATOR
export const cancelPageByIdRequst = () => ({
  type: actionTypes.CANCEL_PAGE_BY_ID_REQUEST
})
