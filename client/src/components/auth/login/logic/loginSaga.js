import { takeLatest, put, call } from 'redux-saga/effects'
import * as actionTypes from './loginActionTypes'
import { userService } from '../../../services/userService'

function * loginUser (action) {
  try {
    const request = yield call(userService.login, [...action.payload])

    yield put({
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        ...request.data
      }
    })
  } catch (error) {
    yield put({
      type: actionTypes.LOGIN_FAILED
    })
  }
}

export default function * loginSaga () {
  yield takeLatest(actionTypes.LOGIN, loginUser)
}
