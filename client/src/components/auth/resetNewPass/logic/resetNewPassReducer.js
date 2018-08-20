import * as actionTypes from './resetNewPassActionTypes'

const initialState = {
  successful: false,
  message: ''
}

export const resetNewPassReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VALID_LINK_SUCCESS:
      return {
        successful: action.response.succesful,
        message: action.response.message
      }
    case actionTypes.VALID_LINK_ERROR:
      return {
        successful: false,
        message: action.error.message
      }
    default:
      return state
  }
}
