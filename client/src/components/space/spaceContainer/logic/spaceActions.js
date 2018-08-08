import * as actionTypes from './spaceActionTypes'

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
