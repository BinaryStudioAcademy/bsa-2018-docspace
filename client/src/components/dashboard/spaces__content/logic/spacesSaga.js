import { takeEvery, put } from 'redux-saga/effects'
import * as actionTypes from './spacesActionTypes'
import { greetingService } from '../../../../services/spacesService'

function * getGreetingText () {
  const result = yield greetingService.getGreetingText()
  yield put({
    type: actionTypes.SET_GREETING_TEXT,
    payload: result.text
  })
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_GREETING_TEXT, getGreetingText)
}
