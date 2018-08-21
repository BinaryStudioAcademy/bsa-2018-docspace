import { takeLatest, call, put } from 'redux-saga/effects'
import { resetService } from 'src/services/resetService'
import * as actionTypes from './setNewPassActionTypes'

function * setNewPassFlow (action) {
  try {
    const { token, password } = action
    const response = yield call(resetService.setNewPass, {token, password})
    console.log(response)
    if (!response.succesful) {
      throw new Error(response.message)
    }
    yield put({ type: actionTypes.VALID_LINK_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.VALID_LINK_ERROR, error })
  }
}

export default function * setNewPassSaga () {
  yield takeLatest(actionTypes.VALID_LINK_REQUEST, setNewPassFlow)
}
