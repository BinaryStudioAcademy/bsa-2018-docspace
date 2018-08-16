import * as actionTypes from './userActionTypes'
import { combineReducers } from 'redux'

const initialState = {
  successful: false,
  messages: [],
  errors: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_SUCCESS:
    {
      return {
        errors: [],
        messages: [action.response.message],
        successful: true,
        user: action.response.user
      }
    }
    case actionTypes.UPDATE_USER_FAILED:
      return {
        errors: [{
          body: action.response.message.toString(),
          time: new Date()
        }],
        messages: [action.response.message],
        successful: false,
        user: action.response.user
      }
    default: return state
  }
}

const checkingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECK_USER_PASSWORD_SUCCESS:
      return {
        errors: [],
        messages: [action.response],
        successful: true
      }
    case actionTypes.CHECK_USER_PASSWORD_FAILED:
      return {
        errors: [{
          body: action.error.toString(),
          time: new Date()
        }],
        messages: [],
        successful: false
      }
    default:
      return state
  }
}

export default combineReducers({
  userReducer,
  checkingReducer
})

export const userById = ({ user }) => user.userReducer