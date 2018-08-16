import { takeLatest, put, all, call } from 'redux-saga/effects'
import * as actionTypes from './userActionTypes'
import { userService } from 'src/services/userService'

function * updUser (action) {
  const response = yield userService.updateUser(action.payload)
  console.log(response)
  if (!response.success) {
    yield put({ type: actionTypes.UPDATE_USER_FAILED, response })
  } else {
    yield put({ type: actionTypes.UPDATE_USER_SUCCESS, response })
  }
}

function * checkUserPassword (action) {
  try {
    const { email, id, password, newPassword } = action

    let response = yield call(userService.checkandUpdatePassword, {email, id, password, newPassword})
    if (!response.success) {
      throw new Error(response.message)
    }
    yield put({ type: actionTypes.CHECK_USER_PASSWORD_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.CHECK_USER_PASSWORD_FAILED, error })
  }
}

export default function * selectionsSaga () {
  yield all([
    takeLatest(actionTypes.UPDATE_USER, updUser),
    takeLatest(actionTypes.CHECK_USER_PASSWORD, checkUserPassword)
  ])
}
