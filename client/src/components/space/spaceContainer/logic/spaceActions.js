import * as actionTypes from './spaceActionTypes'

// GET ALL
export const getSpacesRequest = () => ({
  type: actionTypes.GET_ALL_SPACES_REQUEST
})

export const allSpacesFetchedAndNormalized = (all, byId) => ({
  type: actionTypes.GET_ALL_SPACES_SUCCESS,
  payload: {
    all: all,
    byId: byId
  }
})

export const getAllSpacesError = () => ({
  type: actionTypes.GET_ALL_SPACES_ERROR
})

// GET
export const getSpaceRequest = (id) => ({
  type: actionTypes.GET_SPACE_REQUEST,
  payload: { id }
})

export const getSpaceSuccess = (space) => ({
  type: actionTypes.GET_SPACE_SUCCESS,
  payload: space
})

export const getSpaceError = () => ({
  type: actionTypes.GET_SPACE_ERROR
})

// POST
export const createSpaceRequest = (space) => ({
  type: actionTypes.CREATE_SPACE_REQUEST,
  payload: space
})

export const createSpaceSuccess = (space) => ({
  type: actionTypes.CREATE_SPACE_SUCCESS,
  payload: space
})

export const createSpaceError = () => ({
  type: actionTypes.CREATE_SPACE_ERROR
})

// UPDATE
export const updateSpaceRequest = (newSpace) => ({
  type: actionTypes.UPDATE_SPACE_REQUEST,
  payload: newSpace
})

export const updateSpaceSuccess = (updatedSpace) => ({
  type: actionTypes.UPDATE_SPACE_SUCCESS,
  payload: updatedSpace
})

export const updateSpaceError = () => ({
  type: actionTypes.UPDATE_SPACE_ERROR
})

// DELETE
export const deleteSpaceRequest = (id) => ({
  type: actionTypes.DELETE_SPACE_REQUEST,
  payload: { id }
})

export const deleteSpaceSuccess = (deletedId) => ({
  type: actionTypes.DELETE_SPACE_SUCCESS,
  payload: { _id: deletedId }
})

export const deleteSpaceError = () => ({
  type: actionTypes.DELETE_SPACE_ERROR
})
