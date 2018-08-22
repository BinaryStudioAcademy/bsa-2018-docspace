import * as actionTypes from './historyActionTypes'

const initialState = {
  saved: false
}

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HISTORY_SAVE_SUCCESS:
      return {
        ...action.payload
      }
    case actionTypes.HISTORY_SAVE_ERROR:
      return {
        ...action.payload
      }

    default:
      return state
  }
}
