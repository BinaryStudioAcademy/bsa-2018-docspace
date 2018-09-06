import { takeEvery, put } from 'redux-saga/effects'
import pageService from 'src/services/pageService'
import * as actionTypes from './watcherActionType'
import * as actions from './watcherAction'

function * addWatcher (action) {
  const {user, page} = action.payload
  console.log(user)
  console.log(page)
  try {
    yield pageService.changeWatcher(page._id, user._id, true)
    yield put(actions.deleteWatcherRequest(page, user._id))
  } catch (e) {
    console.log(e)
  }
}

function * removeWatcher (action) {
  const {user, page} = action.payload
  console.log('Remove watcher')
  console.log(user)
  console.log(page)
  try {
    yield pageService.changeWatcher(page._id, user._id, false)
    console.log('Remove reducer')
    yield put(actions.deleteWatcherSuccess(page, user))
    // }
  } catch (e) {
    console.log(e)
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.ADD_WATCHER_REQUEST, addWatcher)
  yield takeEvery(actionTypes.DELETE_WATCHER_REQUEST, removeWatcher)
}
