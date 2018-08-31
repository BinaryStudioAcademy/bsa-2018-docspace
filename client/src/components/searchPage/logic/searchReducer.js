// import { combineReducers } from 'redux'
import * as actionTypes from './searchActionsTypes'

const initialState = {
  items: []
}

// TODO: action for cleaning search. Use : when leaving page, cancel , etc

function searchedItems (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SEARCH_SUCCESS:
      return action.payload
    default: return state
  }
}

export default searchedItems
