import * as actionTypes from './workActionTypes'
import { combineReducers } from 'redux'

const initialState = {
  requesting: false,
  successful: false,
  list: []
}

const userWorks = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_WORKS_SUCCESS:
      return {
        requesting: false,
        successful: true,
        list: action.works
      }
    case actionTypes.GET_USER_WORKS_ERROR:
      return {
        requesting: false,
        successful: false,
        list: []
      }
    default:
      return state
  }
}

export default combineReducers({
  userWorks
})
