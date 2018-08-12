import * as actionTypes from './verActionTypes'

const initialState = {
  requesting: true,
  isLoggedIn: false,
  user: null
}

export const verReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VERIFICATION:
      return {
        requesting: true
      }

    case actionTypes.VERIFICATION_SUCCESS:
      return {
        requesting: false,
        user: action.response.message,
        isLoggedIn: action.response.isLoggedIn
      }

    case actionTypes.VERIFICATION_ERROR:
      return {
        requesting: false,
        isLoggedIn: false,
        user: null,
        ...action.response.message

      }

    case actionTypes.SAVE_USER_IN_SESSION:
      return {
        requesting: false,
        isLoggedIn: true,
        user: action.user
      }

    default:
      return state
  }
}
