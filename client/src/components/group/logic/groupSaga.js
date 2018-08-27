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

function * getGroupById (action) {
  try {
    const group = yield groupService.findById(action.payload)
    yield put(actions.getGroupSuccess(group))
  } catch (e) {
    console.log(e)
  }
}

function * updateGroup (action) {
  try {
    const group = yield groupService.updateGroup(action.payload)
    yield put(actions.updateGroupSuccess(group))
  } catch (e) {
    console.log(e)
  }
}

function * deleteGroup (action) {
  try {
    yield groupService.deleteGroup(action.payload._id)
    yield put(actions.deleteGroupSuccess(action.payload))
  } catch (e) {
    console.log(e)
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.CREATE_GROUP_REQUEST, createGroup)
  yield takeEvery(actionTypes.GET_ALL_GROUPS_REQUEST, getAllUserGroups)
  yield takeEvery(actionTypes.GET_GROUP_REQUEST, getGroupById)
  yield takeEvery(actionTypes.UPDATE_GROUP_REQUEST, updateGroup)
  yield takeEvery(actionTypes.DELETE_GROUP_REQUEST, deleteGroup)
}
