import * as actionTypes from './loginActionTypes'

export const login = (user) => ({
  type: actionTypes.LOGIN,
  payload: {
    email: user.email,
    fullName: user.fullName,
    password: user.password
  }
})
