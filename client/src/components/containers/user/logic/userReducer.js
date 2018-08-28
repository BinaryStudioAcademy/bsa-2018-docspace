import * as actionTypes from './userActionTypes'
import { combineReducers } from 'redux'

const initialState = {
  successful: false,
  messages: [],
  errors: [],
  isFetching: false
}

const initialStateGetUser = {
  user: {}
}

const userHist = []

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

const userHistory = (state = userHist, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_UPDATES_SUCCESS:
      return action.userHistory
    case actionTypes.GET_USER_UPDATES_ERROR:
      return action.error
    default:
      return state
  }
}

function isFetching (state = initialState.isFetching, action) {
  switch (action.type) {
    case actionTypes.UPDATE_USER:
    case actionTypes.CHECK_USER_PASSWORD:
    case actionTypes.GET_USER_REQUEST:
      return true
    case actionTypes.GET_USER_SUCCESS:
    case actionTypes.GET_USER_ERROR:
    case actionTypes.UPDATE_USER_SUCCESS:
    case actionTypes.UPDATE_USER_FAILED:
    case actionTypes.CHECK_USER_PASSWORD_SUCCESS:
    case actionTypes.CHECK_USER_PASSWORD_FAILED:
      return false
    default:
      return state
  }
}
const getUser = (state = initialStateGetUser.user, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
    {
      return action.response
    }
    default: return state
  }
}

export default combineReducers({
  userReducer,
  checkingReducer,
  getUser,
  userHistory,
  isFetching
})
export const getUserSpaces = ({user}) => {
  return user.getUser.spaces
}
export const userById = ({ user }) => user.userReducer
export const isUserFetching = ({ user }) => {
  return user.isFetching
}
