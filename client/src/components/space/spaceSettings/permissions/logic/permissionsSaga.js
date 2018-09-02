import { takeEvery, put } from 'redux-saga/effects'
import * as actions from './permissionsActions'
import * as actionTypes from './permissionsActionsTypes'
import PermissionsService from 'src/services/permissionsService'
import _ from 'lodash'

function * getSpacePermissions (action) {
  try {
    const permissions = yield PermissionsService.getSpacePermissions(action.payload.spaceId)
    let allPermissionsById = {}; let groupsPermissionsIds = []; let usersPermissionsIds = []; let anonymousPermissionsId = ''

    permissions.groupsPermissions.forEach(permissions => {
      if (!_.isEmpty(permissions)) {
        allPermissionsById[permissions._id] = permissions
        groupsPermissionsIds.push(permissions._id)
      }
    })

    permissions.usersPermissions.forEach(permissions => {
      if (!_.isEmpty(permissions)) {
        allPermissionsById[permissions._id] = permissions
        usersPermissionsIds.push(permissions._id)
      }
    })

    if (permissions.anonymous) {
      allPermissionsById[permissions.anonymous._id] = permissions.anonymous
      anonymousPermissionsId = permissions.anonymous._id
    }

    const normalized = { allPermissionsById, groupsPermissionsIds, usersPermissionsIds, anonymousPermissionsId }

    yield put(actions.getSpacePermissionsSuccess(normalized))
  } catch (e) {
    console.log(e)
    yield put(actions.getSpacePermissionsError(e))
  }
}

function * updateSpacePermissions (action) {
  try {
    yield PermissionsService.updateManyPermissionsObjects(action.payload)

    const updatedPermissionsById = action.payload.reduce((byId, permissions) => {
      byId[permissions._id] = permissions
      return byId
    }, {})

    yield put(actions.updateSpacePermissionsSuccess(updatedPermissionsById))
  } catch (e) {
    console.log(e)
    yield put(actions.updateSpacePermissionsError(e))
  }
}

export default function * permissionsSaga () {
  yield takeEvery(actionTypes.GET_SPACE_PERMISSIONS_REQUEST, getSpacePermissions)
  yield takeEvery(actionTypes.UPDATE_SPACE_PERMISSIONS_REQUEST, updateSpacePermissions)
}
