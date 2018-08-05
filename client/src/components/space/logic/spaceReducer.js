import * as actionTypes from './spaceActionTypes'

const initialState = {
  space: {}
}

export const spaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SPACE: {
      return {
        ...state,
        space: action.payload
      }
    }

    default: return state
  }
}
