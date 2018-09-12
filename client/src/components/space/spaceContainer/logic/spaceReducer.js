import * as actionTypes from './spaceActionTypes'
import { UPDATE_PAGE_SUCCESS, DELETE_PAGE_SUCCESS } from 'src/components/page/logic/pageActionTypes'
import { REFRESH_AUTH_USER_PERMISSIONS } from 'src/components/space/spaceSettings/permissions/logic/permissionsActionsTypes'
import { combineReducers } from 'redux'
import * as watcherTypes from 'src/components/page/watcherLogic/watcherActionType'

const initialState = {
  all: [],
  byId: {},
  isFetching: false
}

function all (state = initialState.all, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_SPACES_SUCCESS:
      return action.payload.all

    case actionTypes.DELETE_SPACE_SUCCESS:
    case actionTypes.DELETE_CATEGORY_SUCCESS: {
      return state.filter(id => id !== action.payload._id)
    }

    case actionTypes.GET_SPACE_SUCCESS:
    case actionTypes.CREATE_SPACE_SUCCESS:
      return [ ...state, action.payload._id ]

    default: return state
  }
}

function byId (state = initialState.byId, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SPACE_SUCCESS:
    case actionTypes.ADD_NEW_INFO_SPACE_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }

    case actionTypes.GET_ALL_SPACES_SUCCESS:
      return action.payload.byId

    case actionTypes.GET_SPACE_SUCCESS:
    case actionTypes.CREATE_SPACE_SUCCESS:
    case actionTypes.CREATE_CATEGORY_SUCCESS:
    case actionTypes.DELETE_CATEGORY_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }
    case actionTypes.ADD_PAGE_TO_SPACE:
      const newSpace = {...state[action.payload.spaceId]}
      const newPages = newSpace.pages ? [...newSpace.pages, action.payload.page] : [action.payload.page]
      newSpace.pages = newPages
      return {
        ...state,
        [action.payload.spaceId]: newSpace
      }
    case actionTypes.REFRESH_PAGES_IN_SPACE: {
      const newSpace = {...state[action.payload.spaceId]}
      newSpace.pages = [...action.payload.pages]
      return {
        ...state,
        [action.payload.spaceId]: newSpace
      }
    }
    case actionTypes.REMOVE_PAGE_FROM_SPACE: {
      const newSpace = {...state[action.payload.spaceId]}
      const index = newSpace.pages.findIndex(page => page._id === action.payload.pageId)
      if (index !== -1) {
        const newPages = [...newSpace.pages]
        newPages.splice(index, 1)
        newSpace.pages = newPages
        return {
          ...state,
          [action.payload.spaceId]: newSpace
        }
      }
      return state
    }
    // update target page title in pages list
    case UPDATE_PAGE_SUCCESS: {
      const { _id, spaceId, title } = action.payload
      const newPageForSpace = { _id, title }
      const pages = state[spaceId].pages
      let updatedPages = [ newPageForSpace ]
      if (pages) {
        // If page in space already exist, we shoul update title for this space, becouse it's was updated maybe
        if (pages.some((page) => page._id === _id)) {
          updatedPages = pages.map(page => page._id === _id ? newPageForSpace : page)
        } else updatedPages = [ newPageForSpace, ...pages ]
      }

      return {
        ...state,
        [spaceId]: {
          ...state[spaceId],
          pages: updatedPages
        }
      }
    }

    case DELETE_PAGE_SUCCESS: {
      const {_id, spaceId} = action.payload
      const filteredPage = state[spaceId].pages.filter(page => page._id !== _id)
      return {
        ...state,
        [spaceId]: {
          ...state[spaceId],
          pages: filteredPage
        }
      }
    }

    case watcherTypes.ADD_WATCHER_SPACE_SUCCESS:
    case watcherTypes.DELETE_WATCHER_SPACE_SUCCESS:
      return {
        ...state,
        [action.payload._id]: {
          ...state[action.payload._id],
          isWatched: !action.payload.isWatched
        }
      }

    case REFRESH_AUTH_USER_PERMISSIONS: {
      const { spaceId, permissions } = action.payload
      return {
        ...state,
        [spaceId]: {
          ...state[spaceId],
          authUserPermissions: permissions
        }
      }
    }

    default: return state
  }
}

function isFetching (state = initialState.isFetching, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_SPACES_REQUEST:
    case actionTypes.GET_SPACE_REQUEST:
      return true
    case actionTypes.GET_ALL_SPACES_SUCCESS:
    case actionTypes.GET_ALL_SPACES_ERROR:
    case actionTypes.UPDATE_SPACE_SUCCESS:
    case actionTypes.UPDATE_SPACE_ERROR:
    case actionTypes.GET_SPACE_SUCCESS:
    case actionTypes.GET_SPACE_ERROR:
    case actionTypes.ADD_NEW_INFO_SPACE_SUCCESS:
      return false
    default:
      return state
  }
}

export default combineReducers({
  all,
  byId,
  isFetching
})

// SELECTOR
// usage: import this selector and do this :
// const mapStateToProps = ( state) => { spaces: allSpaces(state) }
// Now you have array of spaces objects

export const allSpaces = ({spaces}) => spaces.all.map(id => spaces.byId[id])

export const spaceById = (state) => {
  const id = state.router.location.pathname.split('/')[2]
  return state.spaces.byId[id]
}

export const getUserId = ({verification}) => verification.user._id

export const isSpacesFetching = ({ spaces }) => spaces.isFetching
