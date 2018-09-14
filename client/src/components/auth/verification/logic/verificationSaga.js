import { take, fork, call, put } from 'redux-saga/effects'
import { loginService } from 'src/services/loginService'
import * as actionTypes from './verificationActionTypes'

function * verificationFlow () {
  try {
    let response = yield call(loginService.verification)
    if (!response.isLoggedIn) {
      throw new Error(response.message)
    }
    response.user.notifications.reverse()
    yield put({ type: actionTypes.VERIFICATION_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.VERIFICATION_ERROR, error })
  }
}

function * verificationWatcher () {
  while (true) {
    const action = yield take(actionTypes.VERIFICATION)
    yield fork(verificationFlow, action)
  }
}

export default verificationWatcher
