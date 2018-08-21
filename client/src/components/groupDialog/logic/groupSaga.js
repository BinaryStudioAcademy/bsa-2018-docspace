import { takeEvery } from 'redux-saga/effects'
import * as actionTypes from './groupsActionsTypes'
import {groupService} from 'src/services/groupService'

function * createGroup (action) {
  try {
    yield groupService.createGroup(action.payload)
  } catch (e) {
    console.log(e)
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.CREATE_GROUP_REQUEST, createGroup)
}
