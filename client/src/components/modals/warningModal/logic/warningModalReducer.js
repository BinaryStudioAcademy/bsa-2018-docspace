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
        action: action.payload.action,
        id: action.payload.id
      }

    case actionTypes.CLOSE_WARNING_MODAL:
      return {
        showModal: false,
        action: null
      }
    default:
      return state
  }
}
