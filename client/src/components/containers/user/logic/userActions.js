import * as actionTypes from './userActionTypes'

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

export const sendAvatarRequest = (file, userId) => ({
  type: actionTypes.SEND_AVATAR_REQUEST,
  payload: {file, userId}
})

export const sendAvatarSuccess = (avatar) => ({
  type: actionTypes.SEND_AVATAR_SUCCESS,
  payload: avatar
})

export const sendAvatarError = (error) => ({
  type: actionTypes.SEND_AVATAR_ERROR,
  payload: error
})
