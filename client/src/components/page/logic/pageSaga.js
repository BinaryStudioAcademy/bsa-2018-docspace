import { takeEvery, put, select } from 'redux-saga/effects'
import * as actions from './pageActions'
import * as actionTypes from './pageActionTypes'
import PageService from 'src/services/pageService'
import { normalize } from 'normalizr'
import { pagesArray } from './pagesNormalizerSchema'
import { push } from 'connected-react-router'
import * as commentsActions from '../commentsLogic/commentsActions'

function * getPages (action) {
  try {
    const pages = yield PageService.getPages()
    const normalized = normalize(pages, pagesArray)
    const all = normalized.result
    const byId = normalized.entities.byId || {}
    yield put(actions.allPagesFetchedAndNormalized(all, byId))
  } catch (e) {
    console.log(e)
    yield put(actions.getAllPagesError())
  }
}

function * createPage (action) {
  try {
    const newPage = yield PageService.createPage(action.payload)
    yield put(actions.createPageSuccess(newPage))
    // Go to the editor
    yield put(push(`/spaces/${newPage.spaceId}/pages/${newPage._id}/edit`))
  } catch (e) {
    console.log(e)
    yield put(actions.createPageError())
  }
}

const spaceIdFromPathname = (state) => state.router.location.pathname.split('/')[2]

function * createBlogPage (action) {
  try {
    const newPage = yield PageService.createPage(action.payload)
    const spaceId = action.spaceId
    yield put(push(`/spaces/${spaceId}/blog/${newPage._id}/edit`))
    yield put(actions.createBlogPageSuccess(newPage))
  } catch (e) {
    console.log(e)
    yield put(actions.createPageError())
  }
}

function * updatePage (action) {
  try {
    const target = action.payload
    // FIX conflict with mongodb and timestamp. Same for blog
    target.createdAt && (delete target.createdAt)
    const updated = yield PageService.updatePage(target)
    yield put(push(`/spaces/${updated.spaceId}/pages/${updated._id}`))
    yield put(actions.updatePageSuccess(updated))
  } catch (e) {
    console.log(e)
    yield put(actions.updatePageError())
  }
}

function * updateBlogPage (action) {
  try {
    const target = action.payload
    target.createdAt && (delete target.createdAt)
    const updated = yield PageService.updatePage(target)
    const spaceId = yield select(spaceIdFromPathname)
    yield put(push(`/spaces/${spaceId}/blog/${updated._id}`))
    yield put(actions.updateBlogPageSuccess(updated))
  } catch (e) {
    console.log(e)
    yield put(actions.updatePageError())
  }
}

function * deletePage (action) {
  try {
    const deletedPage = yield PageService.deletePage(action.payload.id)
    yield put(actions.deletePageSuccess(deletedPage))
    yield put(push(`/spaces/${deletedPage.spaceId}/overview`))
  } catch (e) {
    console.log(e)
    yield put(actions.deletePageError())
  }
}

function * deleteBlogPage (action) {
  try {
    yield PageService.deletePage(action.payload)
    yield put(actions.deleteBlogPageSuccess(action.payload))
    const spaceId = yield select(spaceIdFromPathname)
    yield put(push(`/spaces/${spaceId}/blog`))
  } catch (e) {
    console.log(e)
    yield put(actions.deletePageError())
  }
}
// remove cancel pageUpdate because of navigate to changes doesn't work
// const pagesById = (state) => state.pages.byId

function * getPage (action) {
  try {
    // const pages = yield select(pagesById)
    // if (pages[action.payload.id] && !action.payload.version) {
    //   yield put(actions.cancelPageByIdRequst())
    //   return
    // }
    const page = yield PageService.getPage(action.payload)
    yield commentsActions.allCommentsFetched(page.comments)
    yield put(actions.getPageByIdSuccess(page))
  } catch (err) {
    yield put(actions.getPageByIdError())
    yield put({type: actionTypes.GET_PAGE_BY_ID_ERROR, err})
  }
}

function * sendFile (action) {
  try {
    const sendFile = yield PageService.sendDocFile({spaceId: action.payload.spaceId, title: action.payload.file.name, content: action.payload.file})
    yield put(actions.sendDocFileSuccess(sendFile))
    // Go to the editor
    yield put(push(`/spaces/${sendFile.spaceId}/pages/${sendFile._id}/edit`))
  } catch (e) {
    yield put(actions.sendDocFileError(e))
  }
}
function * exportPageToPdf (action) {
  try {
    yield PageService.exportPageToPdf(action.payload)
  } catch (e) {
    console.log('export error', e)
  }
}

function * exportPageToWord (action) {
  try {
    yield PageService.exportPageToWord(action.payload)
  } catch (e) {
    console.log('export error', e)
  }
}

function * mentionInComment (action) {
  try {
    yield PageService.mentionInComment(action.payload)
  } catch (e) {
    console.log('export error', e)
  }
}

function * relpyInComment (action) {
  try {
    yield PageService.replyInComment(action.payload)
  } catch (e) {
    console.log('export error', e)
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_ALL_PAGES_REQUEST, getPages)
  yield takeEvery(actionTypes.CREATE_PAGE_REQUEST, createPage)
  yield takeEvery(actionTypes.DELETE_PAGE_REQUEST, deletePage)
  yield takeEvery(actionTypes.UPDATE_PAGE_REQUEST, updatePage)
  yield takeEvery(actionTypes.GET_PAGE_BY_ID_REQUEST, getPage)
  yield takeEvery(actionTypes.CREATE_BLOG_PAGE_REQUEST, createBlogPage)
  yield takeEvery(actionTypes.DELETE_BLOG_PAGE_REQUEST, deleteBlogPage)
  yield takeEvery(actionTypes.UPDATE_BLOG_PAGE_REQUEST, updateBlogPage)
  yield takeEvery(actionTypes.SEND_DOC_FILE_REQUEST, sendFile)
  yield takeEvery(actionTypes.EXPORT_PAGE_TO_PDF, exportPageToPdf)
  yield takeEvery(actionTypes.EXPORT_PAGE_TO_WORD, exportPageToWord)
  yield takeEvery(actionTypes.MENTION_COMMENT, mentionInComment)
  yield takeEvery(actionTypes.REPLY_COMMENT_SEND_MAIL, relpyInComment)
}
