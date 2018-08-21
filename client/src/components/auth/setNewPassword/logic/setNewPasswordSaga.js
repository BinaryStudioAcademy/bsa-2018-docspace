import { takeLatest, call, put } from 'redux-saga/effects'
import { resetService } from 'src/services/resetService'
import * as actionTypes from './setNewPasswordActionTypes'

function * setNewPasswordFlow (action) {
  try {
    const { token, password } = action
    const response = yield call(resetService.setNewPassword, {token, password})
    console.log(response)
    if (!response.succesful) {
      throw new Error(response.message)
    }
    yield put({ type: actionTypes.VALID_LINK_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.VALID_LINK_ERROR, error })
  }
}

export default function * setNewPasswordSaga () {
  yield takeLatest(actionTypes.VALID_LINK_REQUEST, setNewPasswordFlow)
}
