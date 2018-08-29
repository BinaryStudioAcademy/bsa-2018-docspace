import * as actionTypes from './warningModalActionTypes'

export const openWarningModal = (forPage, id) => ({
  type: actionTypes.OPEN_WARNING_MODAL,
  payload: { forPage, id }
})

export const closeWarningModal = () => ({
  type: actionTypes.CLOSE_WARNING_MODAL
})
