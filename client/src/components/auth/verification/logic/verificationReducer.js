import * as actionTypes from './verificationActionTypes'
import { SIGNUP_SUCCESS } from 'src/components/auth/signup/logic/signupActionTypes'
import { CLEAR_NOTIFICATIONS_SUCCESS, NOTIFICATION } from 'src/components/modals/notificationsModal/logic/actionsTypes'

const initialState = {
  requesting: true,
  isLoggedIn: false,
  user: null
}

export const verificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VERIFICATION:
      return {
        requesting: true
      }

    case actionTypes.VERIFICATION_SUCCESS:
      return {
        requesting: false,
        user: action.response.user,
        isLoggedIn: action.response.isLoggedIn
      }

    case actionTypes.VERIFICATION_ERROR:
      return {
        requesting: false,
        isLoggedIn: false,
        user: null
      }

    case actionTypes.SAVE_USER_IN_SESSION:
      return {
        requesting: false,
        isLoggedIn: true,
        user: action.user
      }

    case SIGNUP_SUCCESS:
      return {
        requesting: false,
        isLoggedIn: true,
        user: action
      }

    case NOTIFICATION: {
      return {
        ...state,
        user: {
          ...state.user,
          notifications: [ action.payload, ...state.user.notifications ]
        }
      }
    }

    case CLEAR_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          notifications: [ ]
        }
      }
    }

    default:
      return state
  }
}
