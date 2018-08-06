import * as actionTypes from './spacesActionTypes'

const initialState = {
  text: ''
}

export const greetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GREETING_TEXT: {
      return {
        ...state,
        text: action.payload
      }
    }
    default: return state
  }
}
