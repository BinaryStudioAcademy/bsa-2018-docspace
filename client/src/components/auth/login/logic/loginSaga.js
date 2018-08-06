import { take, fork, call, put } from 'redux-saga/effects'
import { loginService } from '../../../../services/loginService'
import * as actionTypes from './loginActionTypes'

function * loginFlow (action) {
  try {
    const { email, password } = action

    let response = yield call(loginService.login, {email, password})
    yield put({ type: actionTypes.LOGIN_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.LOGIN_ERROR, error })
  }
}

function * loginWatcher () {
  while (true) {
    const action = yield take(actionTypes.LOGIN_REQUESTING)
    yield fork(loginFlow, action)
  }
}

export default loginWatcher
