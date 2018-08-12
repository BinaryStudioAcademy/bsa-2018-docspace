import * as actionTypes from './verActionTypes'

export const verRequest = () => ({
  type: actionTypes.VERIFICATION
})

export const saveUserInSession = (user) => ({
  type: actionTypes.SAVE_USER_IN_SESSION,
  user: user
})
