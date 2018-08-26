import { takeEvery, put } from 'redux-saga/effects'
import * as actions from './permissionsActions'
import * as actionTypes from './permissionsActionsTypes'
import PermissionsService from 'src/services/permissionsService'

function * getSpacePermissions (action) {
  try {
    const spacePermissions = yield PermissionsService.getSpacePermissions(action.payload.spaceId)
    yield put(actions.getSpacePermissionsSuccess(spacePermissions))
  } catch (e) {
    console.log(e)
    yield put(actions.getSpacePermissionsError(e))
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_SPACE_PERMISSIONS_REQUEST, getSpacePermissions)
}
