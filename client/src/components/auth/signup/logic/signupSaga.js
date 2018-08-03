import { call, put, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './signupActionTypes'
import { signupService } from '../../../../services/signupService'

function * signupFlow (action) {
  try {
    const { email, fullName, password } = action
    console.log('SignUP SAGA')
    const response = yield call(signupService.signup(email, fullName, password))
    yield put({ type: actionTypes.SIGNUP_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.SIGNUP_ERROR, error })
  }
}

function * signupWatcher () {
  yield takeLatest(actionTypes.SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher
