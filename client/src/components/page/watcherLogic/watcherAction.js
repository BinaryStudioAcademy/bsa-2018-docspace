import * as actionTypes from './watcherActionType'

export const addWatcherRequest = (page, user) => ({
  type: actionTypes.ADD_WATCHER_REQUEST,
  payload: {
    page: page,
    user: user
  }
})

export const addWatcherSuccess = (page, user) => ({
  type: actionTypes.ADD_WATCHER_SUCCESS,
  payload: page

})

export const deleteWatcherRequest = (page, user) => ({
  type: actionTypes.DELETE_WATCHER_REQUEST,
  payload: {
    page: page,
    user: user
  }
})

export const deleteWatcherSuccess = (page, user) => ({
  type: actionTypes.DELETE_WATCHER_SUCCESS,
  payload: page
})

export const addSpaceWatcherRequest = (space, user) => ({
  type: actionTypes.ADD_WATCHER_SPACE_REQUEST,
  payload: {
    space: space,
    user: user
  }
})

export const addSpaceWatcherSuccess = (space, user) => ({
  type: actionTypes.ADD_WATCHER_SPACE_SUCCESS,
  payload: space

})

export const deleteSpaceWatcherRequest = (space, user) => ({
  type: actionTypes.DELETE_WATCHER_SPACE_REQUEST,
  payload: {
    space: space,
    user: user
  }
})

export const deleteSpaceWatcherSuccess = (space, user) => ({
  type: actionTypes.DELETE_WATCHER_SPACE_SUCCESS,
  payload: space
})
