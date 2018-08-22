import * as actionTypes from './activityActionTypes'

const initialState = {
  requesting: false,
  successful: false,
  allUpdates: []
}

export const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_UPDATES_SUCCESS:
      return {
        requesting: false,
        successful: true,
        allUpdates: action.allUserHistory
      }

    case actionTypes.GET_ALL_UPDATES_ERROR:
      return {
        requesting: false,
        allUpdates: null,
        successful: false
      }

    default:
      return state
  }
}
