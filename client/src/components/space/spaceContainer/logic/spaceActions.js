import * as actionTypes from './spaceActionTypes'

// GET
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

// GET ONE
export const getSpaceByIdRequest = (id) => ({
  type: actionTypes.GET_SPACE_BY_ID_REQUEST,
  payload: id
})

export const getSpaceByIdSuccess = (space) => ({
  type: actionTypes.GET_SPACE_BY_ID_SUCCESS,
  payload: space
})

export const getSpaceByIdError = () => ({
  type: actionTypes.GET_SPACE_BY_ID_ERROR
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
