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
  payload: { page,
    user: user }
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
  payload: { page,
    user: user }
})
