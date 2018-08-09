import * as actionTypes from './userActionTypes'

const initialState = {
  user: {},
  requesting: false,
  successful: false,
  messages: [],
  errors: []
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DATA_SUCCESS:
    case actionTypes.UPDATE_USER_SUCCESS:
    {
      return action.payload
    }
    default: return state
  }
}

export const checkingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECK_USER_PASSWORD_SUCCESS:
      return {
        errors: [],
        messages: [action.response],
        requesting: false,
        successful: true
      }

    case actionTypes.CHECK_USER_PASSWORD_FAILED:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date()
        }]),
        messages: [],
        requesting: false,
        successful: false
      }

    default:
      return state
  }
}
