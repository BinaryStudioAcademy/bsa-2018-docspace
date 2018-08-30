import { takeEvery, call, put } from 'redux-saga/effects'
import HistoryService from 'src/services/historyService'
import * as actionTypes from './workActionTypes'

function * UserWorksFlow (action) {
  try {
    let works = yield call(HistoryService.getUserWorks, action.payload.userId)
    yield put({ type: actionTypes.GET_USER_WORKS_SUCCESS, works })
  } catch (error) {
    yield put({ type: actionTypes.GET_USER_WORKS_ERROR, error })
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_USER_WORKS_REQUEST, UserWorksFlow)
}
