import { take, fork, call, put } from 'redux-saga/effects'
import { loginService } from 'src/services/loginService'
import * as actionTypes from './verActionTypes'

function * verFlow () {
  console.log('IN SAGA')
  try {
    let response = yield call(loginService.verification)
    if (!response.success) {
      throw new Error(response.message)
    }
    yield put({ type: actionTypes.VERIFICATION_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.VERIFICATION_ERROR, error })
  }
}

function * verWatcher () {
  while (true) {
    const action = yield take(actionTypes.VERIFICATION)
    yield fork(verFlow, action)
  }
}

export default verWatcher
