import * as actionTypes from './copyPageModalActionTypes'

export const openCopyPageModal = (pageId, spaceId) => ({
  type: actionTypes.OPEN_COPY_PAGE_MODAL,
  payload: {pageId, spaceId}
})

export const closeCopyPageModal = () => ({
  type: actionTypes.CLOSE_COPY_PAGE_MODAL
})
