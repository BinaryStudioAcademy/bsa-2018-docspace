import { takeEvery, put } from 'redux-saga/effects'
import * as actionTypes from './groupsActionsTypes'
import * as actions from './groupsAction'
import {groupService} from 'src/services/groupService'

function * createGroup (action) {
  try {
    const newGroup = yield groupService.createGroup(action.payload)
    yield put(actions.createGroupSuccess(newGroup))
  } catch (e) {
    console.log(e)
  }
}

function * getAllUserGroups (action) {
  try {
    const groups = yield groupService.getAllUserGroups(action.payload)
    yield put(actions.getAllUserGroupsSuccess(groups))
  } catch (e) {
    console.log(e)
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.CREATE_GROUP_REQUEST, createGroup)
  yield takeEvery(actionTypes.GET_ALL_GROUPS_REQUEST, getAllUserGroups)
}
