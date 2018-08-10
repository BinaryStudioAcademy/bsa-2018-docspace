import * as actionTypes from './userActionTypes'

export const getUserData = (id) => {
  return {
    type: actionTypes.GET_USER_DATA,
    payload: {
      id
    }
  }
}

export const updateUser = (user) => {
  return {
    type: actionTypes.UPDATE_USER,
    payload: user
  }
}

export const checkPassword = (user) => {
  return ({
    type: actionTypes.CHECK_USER_PASSWORD,
    ...user
  })
}
