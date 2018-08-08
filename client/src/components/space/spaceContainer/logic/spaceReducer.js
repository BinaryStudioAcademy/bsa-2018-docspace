import * as actionTypes from './spaceActionTypes'

const initialState = {
  space: {},
  pages: [
    {
      name: 'First Test Page'
    },
    {
      name: 'Second Test Page'
    },
    {
      name: 'Third Test Page'
    },
    {
      name: 'Fourth Test Page'
    }
  ]
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
