import * as actionTypes from './userActionTypes'

const initialState = {
  user: {}
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
