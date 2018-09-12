import { takeEvery, call, put } from 'redux-saga/effects'
import HistoryService from 'src/services/historyService'
import * as actionTypes from './historyActionTypes'
import * as allUserActionTypes from './allUserActionTypes'

function * historySpaceFlow (action) {
  try {
    let history = yield call(HistoryService.createHistory, {spaceId: action.payload._id, action: action.type})
    yield put({ type: actionTypes.HISTORY_SPACE_SAVE_SUCCESS, payload: history })
  } catch (error) {
    console.log(error)
    yield put({ type: actionTypes.HISTORY_SPACE_SAVE_ERROR, error })
  }
}

function * historyPageFlow (action) {
  try {
    const { spaceId, _id: pageId, modifiedVersions, version } = action.payload
    const modifiedVersion = modifiedVersions && modifiedVersions.length ? modifiedVersions[modifiedVersions.length - 1].version : version
    let history = yield call(HistoryService.createHistory, {spaceId, pageId, modifiedVersion, action: action.type})
    yield put({ type: actionTypes.HISTORY_PAGE_SAVE_SUCCESS, payload: history })
  } catch (error) {
    console.log(error)
    yield put({ type: actionTypes.HISTORY_PAGE_SAVE_ERROR, error })
  }
}

function * historyBlogFlow (action) {
  try {
    const { spaceId, _id: pageId } = action.payload
    let history = yield call(HistoryService.createHistory, {spaceId, pageId, action: action.type})
    yield put({ type: actionTypes.HISTORY_BLOG_SAVE_SUCCESS, payload: history })
  } catch (error) {
    console.log(error)
    yield put({ type: actionTypes.HISTORY_BLOG_SAVE_ERROR, error })
  }
}

function * historyCommentFlow (action) {
  try {
    let history = yield call(HistoryService.createHistory, {commentId: action.payload._id, action: action.type})
    yield put({ type: actionTypes.HISTORY_COMMENT_SAVE_SUCCESS, payload: history })
  } catch (error) {
    console.log(error)
    yield put({ type: actionTypes.HISTORY_COMMENT_SAVE_ERROR, error })
  }
}

function * historyWatcher () {
  yield takeEvery(Object.values(allUserActionTypes.spaceActions), historySpaceFlow)
  yield takeEvery(Object.values(allUserActionTypes.pageActions), historyPageFlow)
  yield takeEvery(Object.values(allUserActionTypes.blogActions), historyBlogFlow)
  yield takeEvery(Object.values(allUserActionTypes.commentActions), historyCommentFlow)
}

export default historyWatcher
