import * as actionTypes from './groupsActionsTypes'

const initialState = []

function groupsReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_GROUPS_SUCCESS:
      return action.payload
    case actionTypes.CREATE_GROUP_SUCCESS:
      return [ ...state, action.payload ]
    default: return state
  }
}

export default groupsReducer
