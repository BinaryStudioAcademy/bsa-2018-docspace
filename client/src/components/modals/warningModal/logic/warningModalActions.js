import * as actionTypes from './warningModalActionTypes'

export const openWarningModal = (request) => {
  return {
    type: actionTypes.OPEN_WARNING_MODAL,
    payload: {
      renderHeader: request.renderHeader,
      renderMain: request.renderMain,
      method: request.method
    }
  }
}
export const closeWarningModal = () => ({
  type: actionTypes.CLOSE_WARNING_MODAL
})
