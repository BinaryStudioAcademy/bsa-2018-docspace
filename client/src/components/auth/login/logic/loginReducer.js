import * as actionTypes from './loginActionTypes'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: []
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: []
      }

    case actionTypes.LOGIN_SUCCESS:
      return {
        errors: [],
        messages: [action.response],
        requesting: false,
        successful: true
      }

    case actionTypes.LOGIN_ERROR:
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
