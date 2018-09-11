import { takeEvery, call, put } from 'redux-saga/effects'
import HistoryService from 'src/services/historyService'
import * as actionTypes from './activityActionTypes'

function * allUpdatesFlow (action) {
  try {
    let allUserHistory = yield call(HistoryService.getAllUserHistory)
    yield put({ type: actionTypes.GET_ALL_UPDATES_SUCCESS, allUserHistory })
  } catch (error) {
    yield put({ type: actionTypes.GET_ALL_UPDATES_ERROR, error })
  }
}

function * currentUserUpdatesFlow (action) {
  try {
    let currentUserHistory = yield call(HistoryService.getCurrentUserHistory, action.payload.userId)
    yield put({ type: actionTypes.GET_CURRENT_USER_UPDATES_SUCCESS, currentUserHistory })
  } catch (error) {
    yield put({ type: actionTypes.GET_CURRENT_USER_UPDATES_ERROR, error })
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_ALL_UPDATES_REQUEST, allUpdatesFlow)
  yield takeEvery(actionTypes.GET_CURRENT_USER_UPDATES_REQUEST, currentUserUpdatesFlow)
}
