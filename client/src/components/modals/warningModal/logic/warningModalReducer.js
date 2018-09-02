import * as actionTypes from './warningModalActionTypes'

const initialState = {
  showModal: false,
  forPage: false,
  deleteId: ''
}

export const warningModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_WARNING_MODAL:
      return {
        showModal: true,
        forPage: action.payload.forPage,
        deleteId: action.payload.id
      }

    case actionTypes.CLOSE_WARNING_MODAL:
      return {
        showModal: false,
        deleteId: ''
      }
    default:
      return state
  }
}
