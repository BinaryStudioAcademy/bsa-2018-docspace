import * as actionTypes from './verificationActionTypes'

export const verificationRequest = () => ({
  type: actionTypes.VERIFICATION
})

export const saveUserInSession = (user) => ({
  type: actionTypes.SAVE_USER_IN_SESSION,
  user: user
})
