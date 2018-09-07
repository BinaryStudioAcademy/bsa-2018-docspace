import { takeEvery, put } from 'redux-saga/effects'
import * as actionTypes from './matchingUserActionsType'
import * as actions from './matchingUserActions'
import {groupService} from 'src/services/groupService'

function * getAllMatchingUser (action) {
  try {
    const users = yield groupService.getMatchingUsers(action.payload)
    yield put(actions.getAllUserGroupsSuccess(users))
  } catch (e) {
    console.log(e)
  }
}
function * sendInvitationSaga (action) {
  try {
    yield groupService.sendInvitation(action.payload)
  } catch (e) {
    console.log(e)
  }
}
export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_MATCHING_USERS_REQUEST, getAllMatchingUser)
  yield takeEvery(actionTypes.SEND_INVITATION, sendInvitationSaga)
}
