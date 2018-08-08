import * as actionTypes from 'src/components/space/spaceContainer/logic/spaceActionTypes'

export const getSpace = (key) => {
  return {
    type: actionTypes.GET_SPACE,
    payload: key
  }
}

export const setSpace = (space) => {
  return {
    type: actionTypes.SET_SPACE,
    payload: space
  }
}

// CREATE
export const createSpace = (space) => ({
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
