import { takeEvery, put, all } from 'redux-saga/effects'
import * as actionTypes from './userActionTypes'
import { userService } from '../../../services/userService'

function * getUser (action) {
  const result = yield userService.getUserData(action.payload.id)
  yield put({
    type: actionTypes.GET_USER_DATA_SUCCESS,
    payload: result
  })
}

function * updUser (action) {
  const result = yield userService.updateUser(action.payload)
  yield put({
    type: actionTypes.UPDATE_USER_SUCCESS,
    payload: result
  })
}

export default function * selectionsSaga () {
  yield all([
    takeEvery(actionTypes.GET_USER_DATA, getUser),
    takeEvery(actionTypes.UPDATE_USER, updUser)
  ])
}
