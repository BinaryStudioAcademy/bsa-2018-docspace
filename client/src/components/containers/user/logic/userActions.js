import * as actionTypes from './userActionTypes'

export const getUser = (id) => {
  return {
    type: actionTypes.GET_USER_REQUEST,
    payload: id
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

export const getUserUpdatesRequest = (userLogin) => ({
  type: actionTypes.GET_USER_UPDATES_REQUEST,
  payload: userLogin
})

export const compareUserRequest = (currentUserLogin, RequestedUserLogin) => ({
  type: actionTypes.COMPARE_USER_REQUEST,
  payload: {currentUserLogin: currentUserLogin, RequestedUserLogin: RequestedUserLogin}
})
