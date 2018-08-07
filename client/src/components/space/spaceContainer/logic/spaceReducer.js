import * as actionTypes from 'src/components/space/spaceContainer/logic/spaceActionTypes'

const initialState = {
  space: {},
  // dummy
  pages: [
    {
      name: 'First Test Page',
      id: '666'
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
