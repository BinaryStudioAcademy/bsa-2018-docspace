import { takeEvery, put } from 'redux-saga/effects'
import * as actionTypes from './actionsTypes'
import * as actions from './actions'
import NotificationsService from 'src/services/notificationsService'

function * clearNotifications (action) {
  try {
    const res = yield NotificationsService.clearNotifications(action.payload.targetUser, action.payload.notificationsIds)
    yield put(actions.clearNotificationsSuccess(res))
  } catch (error) {
    yield put(actions.clearNotificationsError(error))
  }
}

export default function * notificationsSaga () {
  yield takeEvery(actionTypes.CLEAR_NOTIFICATIONS, clearNotifications)
}
