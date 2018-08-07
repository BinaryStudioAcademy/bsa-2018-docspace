import * as actionTypes from './spacesActionTypes'

const initialState = {
  spaces: []
}

export const greetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SPACES: {
      return {
        ...state,
        spaces: action.payload
      }
    }
    default: return state
  }
}
