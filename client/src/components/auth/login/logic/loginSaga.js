import { take, fork, call, put } from 'redux-saga/effects'
import { loginService } from 'src/services/loginService'
import * as actionTypes from './loginActionTypes'
import { push } from 'connected-react-router'

function * loginFlow (action) {
  try {
    const { email, password } = action

    let response = yield call(loginService.login, {email, password})
    console.log(response.success)
    if (!response.success) {
      throw new Error(response.message)
    }
    yield put({ type: actionTypes.LOGIN_SUCCESS, response })
    yield put(push('/'))
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
