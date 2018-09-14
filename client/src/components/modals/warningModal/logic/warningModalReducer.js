import * as actionTypes from './warningModalActionTypes'

const initialFunc = () => {
  return null
}

export const warningModalReducer = (state = initialFunc, action) => {
  switch (action.type) {
    case actionTypes.OPEN_WARNING_MODAL:
      return {
        showModal: true,
        renderHeader: action.payload.renderHeader,
        renderMain: action.payload.renderMain,
        method: action.payload.method
      }

    case actionTypes.CLOSE_WARNING_MODAL:
      return {
        showModal: false,
        method: null
      }
    default:
      return state
  }
}
