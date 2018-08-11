import * as actionTypes from './verActionTypes'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: []
}

export const verReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VERIFICATION:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Verification...', time: new Date() }],
        errors: []
      }

    case actionTypes.VERIFICATION_SUCCESS:
      return {
        errors: [],
        messages: [action.response],
        requesting: false,
        successful: true
      }

    case actionTypes.VERIFICATION_ERROR:
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
