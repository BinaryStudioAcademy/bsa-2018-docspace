import { takeLatest, call, put } from 'redux-saga/effects'
import { resetService } from 'src/services/resetService'
import * as actionTypes from './resetActionTypes'

function * resetFlow (action) {
  try {
    const { email } = action
    const response = yield call(resetService.reset, {email})
    if (!response.succesful) {
      throw new Error(response.message)
    }
    yield put({ type: actionTypes.RESET_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.RESET_ERROR, error })
  }
}

export default function * resetSaga () {
  yield takeLatest(actionTypes.RESET_REQUESTING, resetFlow)
}
