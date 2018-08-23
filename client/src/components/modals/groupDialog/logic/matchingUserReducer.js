import * as actionTypes from './matchingUserActionsType'

const initialState = []

function matchingUsersReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_MATCHING_USERS_SUCCESS:
      return action.payload
    case actionTypes.CLEAN_MATCHING_USERS:
      return []
    default: return state
  }
}

export default matchingUsersReducer
