import * as types from './actionsTypes'

export const clearNotificationsForUser = (userId, notificationsIds) => ({
  type: types.CLEAR_NOTIFICATIONS,
  payload: { targetUser: userId, notificationsIds }
})

export const clearNotificationsSuccess = () => ({
  type: types.CLEAR_NOTIFICATIONS_SUCCESS
})

export const clearNotificationsError = (error) => ({
  type: types.CLEAR_NOTIFICATIONS_ERROR,
  payload: error
})
