import * as actionTypes from './resetActionTypes'

const initialState = {
  successful: false,
  message: ''
}

export const resetReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_SUCCESS:
      return {
        successful: action.response.succesful,
        message: action.response.message
      }

    case actionTypes.RESET_ERROR:
      return {
        successful: false,
        message: action.error.message
      }

    default:
      return state
  }
}
