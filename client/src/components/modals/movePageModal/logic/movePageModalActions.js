import * as actionTypes from './movePageModalActionTypes'

export const openMovePageModal = (pageId, fromSpaceId) => ({
  type: actionTypes.OPEN_MOVE_PAGE_MODAL,
  payload: {pageId, fromSpaceId}
})

export const closeMovePageModal = () => ({
  type: actionTypes.CLOSE_MOVE_PAGE_MODAL
})
