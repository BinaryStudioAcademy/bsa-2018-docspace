import { takeEvery, put, select } from 'redux-saga/effects'
import * as actions from './permissionsActions'
import * as actionsTypes from './permissionsActionsTypes'
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

    if (permissions.anonymousPermissions) {
      allPermissionsById[permissions.anonymousPermissions._id] = permissions.anonymousPermissions
      anonymousPermissionsId = permissions.anonymousPermissions._id
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

    yield put(actions.updateSpacePermissionsSuccess(updatedPermissionsById, action.spaceId))
  } catch (e) {
    console.log(e)
    yield put(actions.updateSpacePermissionsError(e))
  }
}

function * addPermissionsForGroup (action) {
  try {
    let permissions = yield PermissionsService.createGroupPermissions(action.payload)
    const { group } = action
    permissions = { ...permissions, group: group }
    yield put(actions.addGroupPermissionsSuccess(permissions))
  } catch (e) {
    console.log(e)
    yield put(actions.addGroupPermissionsError(e))
  }
}

function * addPermissionsForUser (action) {
  try {
    let permissions = yield PermissionsService.createUserPermissions(action.payload)
    const { user } = action
    permissions = { ...permissions, user: user }
    yield put(actions.addUserPermissionsSuccess(permissions))
  } catch (e) {
    console.log(e)
    yield put(actions.addUserPermissionsError(e))
  }
}

function * handleExternalUpdating (action) {
  const {spaceId, payload} = action
  const spacesById = yield select(({ spaces }) => spaces.byId)

  if (spacesById[spaceId]) {
    const space = spacesById[spaceId]
    const authUserId = yield select(({verification}) => verification.user._id)
    const permissions = Object.values(payload.updatedById)

    for (let i = 0; i < permissions.length; i++) {
      if (permissions[i].user && permissions[i].user._id === authUserId) {
        yield put(actions.RefreshAuthUserPermissions(spaceId, permissions[i]))
        break
      }

      if (space.ownerId._id !== authUserId && permissions[i].group &&
         permissions[i].group.members.some(id => id === authUserId)) {
        yield put(actions.RefreshAuthUserPermissions(spaceId, permissions[i]))
      }
    }
  }
}

export default function * permissionsSaga () {
  yield takeEvery(actionsTypes.GET_SPACE_PERMISSIONS_REQUEST, getSpacePermissions)
  yield takeEvery(actionsTypes.UPDATE_SPACE_PERMISSIONS_REQUEST, updateSpacePermissions)
  yield takeEvery(actionsTypes.ADD_GROUP_PERMISSIONS_REQUEST, addPermissionsForGroup)
  yield takeEvery(actionsTypes.ADD_USER_PERMISSIONS_REQUEST, addPermissionsForUser)
  yield takeEvery(actionsTypes.UPDATE_SPACE_PERMISSIONS_SUCCESS + '(EXTERNAL)', handleExternalUpdating)
}
