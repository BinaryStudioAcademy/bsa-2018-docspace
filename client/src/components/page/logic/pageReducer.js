import { combineReducers } from 'redux'
import * as actionTypes from './pageActionTypes'
import getPageIdFromRouterLocation from 'src/helpers/pages/getPageIdFromRouterLocation'

const initialState = {

  all: [],
  byId: {},
  htmlFile: {
    html: '',
    succesful: false,
    errors: []
  },
  isFetching: false
}

function all (state = initialState.all, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_PAGES_SUCCESS:
      return action.payload.all

    case actionTypes.DELETE_PAGE_SUCCESS:
    case actionTypes.DELETE_BLOG_PAGE_SUCCESS:
      return state.filter(id => id !== action.payload._id)

    case actionTypes.GET_PAGE_BY_ID_SUCCESS:
    case actionTypes.CREATE_PAGE_SUCCESS:
    case actionTypes.CREATE_BLOG_PAGE_SUCCESS:
    case actionTypes.SEND_DOC_FILE_SUCCESS:
      return [ ...state, action.payload._id ]

    default: return state
  }
}

function byId (state = initialState.byId, action) {
  switch (action.type) {
    case actionTypes.UPDATE_PAGE_SUCCESS:
    case actionTypes.UPDATE_BLOG_PAGE_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }

    case actionTypes.GET_ALL_PAGES_SUCCESS:
      return action.payload.byId

    case actionTypes.GET_PAGE_BY_ID_SUCCESS:
    case actionTypes.CREATE_PAGE_SUCCESS:
    case actionTypes.SEND_DOC_FILE_SUCCESS:
    case actionTypes.CREATE_BLOG_PAGE_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }

    default: return state
  }
}

function getHTML (state = initialState.htmlFile, action) {
  switch (action.type) {
    case actionTypes.SEND_DOC_FILE_SUCCESS:
      return {...action.payload}
    case actionTypes.SEND_DOC_ERROR:
      return {...state}
    default: return state
  }
}

function isFetching (state = initialState.isFetching, action) {
  switch (action.type) {
    case actionTypes.GET_PAGE_BY_ID_REQUEST:
    case actionTypes.SEND_DOC_FILE_REQUEST:
      return true
    case actionTypes.GET_PAGE_BY_ID_SUCCESS:
    case actionTypes.GET_PAGE_BY_ID_ERROR:
    case actionTypes.CANCEL_PAGE_BY_ID_REQUEST:
    case actionTypes.SEND_DOC_FILE_SUCCESS:
    case actionTypes.SEND_DOC_ERROR:
    case actionTypes.CREATE_PAGE_SUCCESS:
    case actionTypes.CREATE_PAGE_ERROR:
      return false
    default:
      return state
  }
}

export default combineReducers({
  all,
  byId,
  getHTML,
  isFetching
})

export const allPages = ({pages}) => pages.all.map(id => pages.byId[id])

// TODO: test this. Usage: for getting all pages for space
export const pagesByIdsArray = ({pages}, ids) => ids.map(id => pages.byId[id])

export const pageByIdFromRoute = (state) => {
  const id = getPageIdFromRouterLocation(state.router.location)
  // console.log('SELECTOR :' ,id)
  // console.log(state.router.location)
  return state.pages.byId[id] || null
}
export const isPagesFetching = ({ pages }) => {
  return pages.isFetching
}

export const getDocFileInHTML = ({pages}) => {
  return pages.getHTML
}
// DELETE THIS LATER!
// export const spaceHomepageByIdFromRoute = (state) => {
//   const names = state.router.location.pathname.split('/')
//   const id = names[2]
//   return state.pages.byId[id] || null
// }
