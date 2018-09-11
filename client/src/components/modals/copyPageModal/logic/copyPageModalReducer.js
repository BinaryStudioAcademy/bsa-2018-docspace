import * as actionTypes from './copyPageModalActionTypes'

const initialState = {
  showModal: false,
  spaceId: '',
  pageId: ''
}

export const copyPageModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_COPY_PAGE_MODAL:
      return {
        showModal: true,
        spaceId: action.payload.spaceId,
        pageId: action.payload.pageId
      }

    case actionTypes.CLOSE_COPY_PAGE_MODAL:
      return {
        showModal: false
      }
    default:
      return state
  }
}
