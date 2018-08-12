import * as actionTypes from './userActionTypes'
import { combineReducers } from 'redux'

const initialStateUser = {
  user: {}
}

const initialStatePassword = {
  successful: false,
  messages: [],
  errors: []
}

const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DATA_SUCCESS:
    case actionTypes.UPDATE_USER_SUCCESS:
    {
      return action.payload
    }
    default: return state
  }
}

const checkingReducer = (state = initialStatePassword, action) => {
  switch (action.type) {
    case actionTypes.CHECK_USER_PASSWORD_SUCCESS:
      return {
        errors: [],
        messages: [action.response],
        successful: true
      }
    case actionTypes.CHECK_USER_PASSWORD_FAILED:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date()
        }]),
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
