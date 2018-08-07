import { takeEvery, put } from 'redux-saga/effects'
import * as actionTypes from './spacesActionTypes'
import { greetingService } from '../../../../services/spacesService'

function * getSpaces () {
  const result = yield greetingService.getSpaces()
  yield put({
    type: actionTypes.SET_GREETING_TEXT,
    payload: result.space
  })
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_GREETING_TEXT, getSpaces)
}
