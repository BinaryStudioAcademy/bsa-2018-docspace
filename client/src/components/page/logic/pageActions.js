import * as actionTypes from './pageActionTypes'

// GET
export const getPagesRequest = () => ({
  type: actionTypes.GET_ALL_PAGES_REQUEST
})

export const allPagesFetchedAndNormalized = (all, byId) => ({
  type: actionTypes.GET_ALL_PAGES_SUCCESS,
  payload: {
    all: all,
    byId: byId
  }
})

export const getAllPagesError = () => ({
  type: actionTypes.GET_ALL_PAGES_ERROR
})

// GET ONE
export const getPageByIdRequest = (id, version) => ({
  type: actionTypes.GET_PAGE_BY_ID_REQUEST,
  payload: {id, version}
})

export const getPageByIdSuccess = (page) => ({
  type: actionTypes.GET_PAGE_BY_ID_SUCCESS,
  payload: page
})

export const getPageByIdError = () => ({
  type: actionTypes.GET_PAGE_BY_ID_ERROR
})

// POST
export const createPageRequest = (page) => ({
  type: actionTypes.CREATE_PAGE_REQUEST,
  payload: page
})

export const createPageSuccess = (page) => ({
  type: actionTypes.CREATE_PAGE_SUCCESS,
  payload: page
})

export const createBlogPageRequest = (page, spaceId, userId) => ({
  type: actionTypes.CREATE_BLOG_PAGE_REQUEST,
  payload: {...page, spaceId: spaceId},
  spaceId: spaceId,
  userId: userId
  // This field we need for redirect to '/spaces/:space_id/blog/:page_id'
  // If we create blog page outside of some space ( at app root, for example),
  // we can't get spaceId. From server we receive page without spaceId. just blogId.
  // So, I suggest pass spaceId directly with action to target saga. In this way, we can redirect to target path
})

export const createBlogPageSuccess = (blogPage) => ({
  type: actionTypes.CREATE_BLOG_PAGE_SUCCESS,
  payload: blogPage
})

export const createPageError = () => ({
  type: actionTypes.CREATE_PAGE_ERROR
})

// UPDATE
export const updatePageRequest = (newPage) => ({
  type: actionTypes.UPDATE_PAGE_REQUEST,
  payload: newPage
})

export const updatePageSuccess = (updatedPage) => {
  const pageWithCorrectCommentTime = updatedPage

  pageWithCorrectCommentTime.comments = updatedPage.comments.map((comment) => {
    comment.createdAt = new Date(comment.createdAt)
    return comment
  })

  return {
    type: actionTypes.UPDATE_PAGE_SUCCESS,
    payload: pageWithCorrectCommentTime
  }
}

export const updateBlogPageRequest = (newPage, spaceId) => ({
  type: actionTypes.UPDATE_BLOG_PAGE_REQUEST,
  payload: {...newPage, spaceId}
})

// Create date from string... TODO: move this somewheare else. It's not good. Maybe, in saga
export const updateBlogPageSuccess = (updatedPage) => {
  const pageWithCorrectCommentTime = updatedPage

  pageWithCorrectCommentTime.comments = updatedPage.comments.map((comment) => {
    comment.createdAt = new Date(comment.createdAt)
    return comment
  })
  return {
    type: actionTypes.UPDATE_BLOG_PAGE_SUCCESS,
    payload: pageWithCorrectCommentTime
  }
}

export const updatePageError = () => ({
  type: actionTypes.UPDATE_PAGE_ERROR
})

// DELETE
export const deletePageRequest = (id) => ({
  type: actionTypes.DELETE_PAGE_REQUEST,
  payload: { id }
})

export const deletePageSuccess = (deletedPage) => ({
  type: actionTypes.DELETE_PAGE_SUCCESS,
  payload: deletedPage
})

export const deleteBlogPageRequest = (page) => ({
  type: actionTypes.DELETE_BLOG_PAGE_REQUEST,
  payload: { ...page }
})

export const deleteBlogPageSuccess = (deletedPage) => ({
  type: actionTypes.DELETE_BLOG_PAGE_SUCCESS,
  payload: deletedPage
})

export const deletePageError = () => ({
  type: actionTypes.DELETE_PAGE_ERROR
})

// CANCEL REQUST INDICATOR
export const cancelPageByIdRequst = () => ({
  type: actionTypes.CANCEL_PAGE_BY_ID_REQUEST
})

// SEND DOC FILE
export const sendDocFileRequest = (fileAndSpaceId) => ({
  type: actionTypes.SEND_DOC_FILE_REQUEST,
  payload: { spaceId: fileAndSpaceId.spaceId, file: fileAndSpaceId.file }
})

export const sendDocFileSuccess = (pagefile) => ({
  type: actionTypes.SEND_DOC_FILE_SUCCESS,
  payload: pagefile
})

export const sendDocFileError = (error) => ({
  type: actionTypes.SEND_DOC_ERROR,
  payload: error
})
// EXPORT
export const exportPageToPdf = (page) => ({
  type: actionTypes.EXPORT_PAGE_TO_PDF,
  payload: page
})

export const exportPageToWord = (page) => ({
  type: actionTypes.EXPORT_PAGE_TO_WORD,
  payload: page
})

export const movePageToSpaceRequest = (pageId, fromSpaceId, toSpaceId) => ({
  type: actionTypes.MOVE_PAGE_TO_SPACE_REQUEST,
  payload: {pageId, fromSpaceId, toSpaceId}
})

export const movePageToSpaceSuccess = () => ({
  type: actionTypes.MOVE_PAGE_TO_SPACE_SUCCESS
})

export const movePageToSpaceError = () => ({
  type: actionTypes.MOVE_PAGE_TO_SPACE_ERROR
})

export const copyPageRequest = (pageId, spaceId) => ({
  type: actionTypes.COPY_PAGE_REQUEST,
  payload: {pageId, spaceId}
})

export const copyPageSuccess = () => ({
  type: actionTypes.COPY_PAGE_SUCCESS
})

export const copyPageError = () => ({
  type: actionTypes.COPY_PAGE_ERROR
})
