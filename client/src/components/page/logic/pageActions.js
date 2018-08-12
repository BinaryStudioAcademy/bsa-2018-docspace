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

export const updatePageSuccess = (updatedPage) => ({
  type: actionTypes.UPDATE_PAGE_SUCCESS,
  payload: updatedPage
})

export const updatePageError = () => ({
  type: actionTypes.UPDATE_PAGE_ERROR
})

// DELETE
export const deletePageRequest = (id) => ({
  type: actionTypes.DELETE_PAGE_REQUEST,
  payload: { id }
})

export const deletePageSuccess = (deletedId) => ({
  type: actionTypes.DELETE_PAGE_SUCCESS,
  payload: { _id: deletedId }
})

export const deletePageError = () => ({
  type: actionTypes.DELETE_PAGE_ERROR
})
