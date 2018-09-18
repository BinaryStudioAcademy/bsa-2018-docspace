import { takeEvery, put } from 'redux-saga/effects'
import pageService from 'src/services/pageService'
import spaceService from 'src/services/spaceService'
import * as actionTypes from './watcherActionType'
import * as actions from './watcherAction'

function * addWatcher (action) {
  const {user, page} = action.payload
  console.log(user)
  console.log(page)
  try {
    const y = yield pageService.changeWatcher(page._id, user._id, true)
    console.log(y)

    yield put(actions.addWatcherSuccess(page))
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
    const y = yield pageService.changeWatcher(page._id, user._id, false)
    console.log(y)
    // page.isWatched = !page.isWatched
    console.log('Remove reducer')
    yield put(actions.deleteWatcherSuccess(page))
    // }
  } catch (e) {
    console.log(e)
  }
}

function * addWatcherToSpace (action) {
  const {user, space} = action.payload
  console.log(action.payload)
  console.log('addWatcherToSpace')
  try {
    const y = yield spaceService.changeWatcher(space._id, user._id, true)
    console.log(y)

    yield put(actions.addSpaceWatcherSuccess(space))
  } catch (e) {
    console.log(e)
  }
}

function * removeWatcherFromSpace (action) {
  const {user, space} = action.payload
  console.log('Remove watcher')
  // console.log(user)
  console.log('removeWatcherFromSpace')
  try {
    const y = yield spaceService.changeWatcher(space._id, user._id, false)
    console.log(y)
    console.log('Remove reducer')
    yield put(actions.deleteSpaceWatcherSuccess(space))
    // }
  } catch (e) {
    console.log(e)
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.ADD_WATCHER_REQUEST, addWatcher)
  yield takeEvery(actionTypes.DELETE_WATCHER_REQUEST, removeWatcher)
  yield takeEvery(actionTypes.ADD_WATCHER_SPACE_REQUEST, addWatcherToSpace)
  yield takeEvery(actionTypes.DELETE_WATCHER_SPACE_REQUEST, removeWatcherFromSpace)
}
