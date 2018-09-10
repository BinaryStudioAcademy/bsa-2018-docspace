import * as actionTypes from './movePageModalActionTypes'

const initialState = {
  showModal: false,
  pageId: '',
  fromSpaceId: '',
  toSpaceId: ''
}

export const movePageModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MOVE_PAGE_MODAL:
      return {
        showModal: true,
        pageId: action.payload.pageId,
        fromSpaceId: action.payload.fromSpaceId
      }

    case actionTypes.CLOSE_MOVE_PAGE_MODAL:
      return {
        showModal: false
      }
    default:
      return state
  }
}
