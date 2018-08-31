import * as actionTypes from './searchActionType'

const initialState = []

function matchingUsersReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_MATCHING_PAGES_SUCCESS:
      return action.payload
    case actionTypes.CLEAN_MATCHING_PAGES:
      return []
    default: return state
  }
}

export default matchingUsersReducer
