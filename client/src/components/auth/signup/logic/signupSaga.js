import { call, put, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './signupActionTypes'
import { push } from 'connected-react-router'
import { signupService } from '../../../../services/signupService'
import { saveUserInSession } from 'src/components/auth/verification/logic/verificationActions'

function * signupFlow (action) {
  try {
    const { email, fullName, password, login } = action
    const response = yield call(signupService.signup, {email, fullName, password, login})
    if (response.hasOwnProperty('error')) {
      throw new Error(response.error)
    }
    yield localStorage.setItem('token', response.token)
    yield put({ type: actionTypes.SIGNUP_SUCCESS, ...response.user })
    yield put(saveUserInSession(response.user))
    yield put(push(`/activity`))
  } catch (error) {
    yield put({ type: actionTypes.SIGNUP_ERROR, error })
  }
}

function * signupWatcher () {
  yield takeLatest(actionTypes.SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher
