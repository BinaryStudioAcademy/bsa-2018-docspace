import { takeEvery, put } from 'redux-saga/effects'
import * as actionTypes from './allUsersActionType'
import * as actions from './allUsersActions'
import {userService} from 'src/services/userService'

function * getAllUsers () {
  try {
    const users = yield userService.getAllUsers()
    yield put(actions.getAllUsersSuccess(users))
  } catch (e) {
    console.log(e)
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_ALL_USERS_REQUEST, getAllUsers)
}
