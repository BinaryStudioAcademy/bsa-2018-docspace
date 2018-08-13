import { combineReducers } from 'redux'
import * as actionTypes from './pageActionTypes'

const initialState = {
  all: ['5b6bf22eaf609328f4264ceb'],
  byId: {
    '5b6bf22eaf609328f4264ceb': {
      title: 'First Test Page',
      content: 'This is content',
      created: {
        date: 'Aug 05, 2018',
        user: {
          avatar: 'http://icons-for-free.com/free-icons/png/512/197582.png',
          firstName: 'Jennifer',
          lastName: 'Lopez'
        }
      },
      usersLikes: [
        'Barack Obama',
        'Daryna Gavrylenko'
      ]
    }
  }
}

function all (state = initialState.all, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_PAGES_SUCCESS:
      return action.payload.all

    case actionTypes.DELETE_PAGE_SUCCESS:
      return state.filter(id => id !== action.payload.id)

    case actionTypes.GET_PAGE_BY_ID_SUCCESS:
    case actionTypes.CREATE_PAGE_SUCCESS:
      return [ ...state, action.payload._id ]

    default: return state
  }
}

function byId (state = initialState.byId, action) {
  switch (action.type) {
    case actionTypes.UPDATE_PAGE_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }

    case actionTypes.GET_ALL_PAGES_SUCCESS:
      return action.payload.byId

    case actionTypes.GET_PAGE_BY_ID_SUCCESS:
    case actionTypes.CREATE_PAGE_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }

    default: return state
  }
}

export default combineReducers({
  all,
  byId
})

export const allPages = ({pages}) => pages.all.map(id => pages.byId[id])

// TODO: test this. Usage: for getting all pages for space
export const pagesByIdsArray = ({pages}, ids) => ids.map(id => pages.byId[id])

export const pageByIdFromRoute = (state) => {
  const locationNames = state.router.location.pathname.split('/')
  // for path like /spaces/space_id/pages/PAGE_ID
  if (locationNames.length < 5) return null
  const id = locationNames[4]
  return state.pages.byId[id]
}
