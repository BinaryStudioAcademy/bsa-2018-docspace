import * as actionTypes from './allUsersActionType'

const initialState = []

function allUsersReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return action.payload
    default: return state
  }
}

export default allUsersReducer
