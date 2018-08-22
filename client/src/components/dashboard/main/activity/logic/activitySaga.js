import { takeEvery, call, put } from 'redux-saga/effects'
import HistoryService from 'src/services/historyService'
import * as actionTypes from './activityActionTypes'

function * activityFlow (action) {
  try {
    let allUserHistory = yield call(HistoryService.getAllUserHistory, action.payload.userId)
    yield put({ type: actionTypes.GET_ALL_UPDATES_SUCCESS, allUserHistory })
  } catch (error) {
    yield put({ type: actionTypes.GET_ALL_UPDATES_ERROR, error })
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_ALL_UPDATES_REQUEST, activityFlow)
}
