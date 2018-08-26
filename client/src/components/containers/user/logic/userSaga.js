import { takeLatest, put, all, call } from 'redux-saga/effects'
import * as actionTypes from './userActionTypes'
import { userService } from 'src/services/userService'

function * getUser (action) {
  try {
    const response = yield userService.getUser(action.payload)
    yield put({ type: actionTypes.GET_USER_SUCCESS, response })
  } catch (err) {
    yield put({ type: actionTypes.GET_USER_ERROR, err })
  }
}

function * updUser (action) {
  const response = yield userService.updateUser(action.payload)
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

function * sendAvatarFile (action) {
  try {
    const response = yield userService.sendAvatarFile(action.payload.file, action.payload.userId)
    console.log(`saga`, action)
    console.log(`saga AVATAR`, response)
    yield put({ type: actionTypes.UPDATE_USER_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.UPDATE_USER_FAILED, error })
  }
}

export default function * selectionsSaga () {
  yield all([
    takeLatest(actionTypes.UPDATE_USER, updUser),
    takeLatest(actionTypes.CHECK_USER_PASSWORD, checkUserPassword),
    takeLatest(actionTypes.SEND_AVATAR_REQUEST, sendAvatarFile),
    takeLatest(actionTypes.GET_USER_REQUEST, getUser)
  ])
}
