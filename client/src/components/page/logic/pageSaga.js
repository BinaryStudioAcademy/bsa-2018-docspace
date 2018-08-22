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
    yield PageService.deletePage(action.payload)
    yield put(actions.deletePageSuccess(action.payload))
    yield put(push(`/spaces/${action.payload.spaceId}/overview`))
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

const pagesById = (state) => state.pages.byId

function * getPage (action) {
  try {
    const pages = yield select(pagesById)
    if (pages[action.payload]) {
      yield put(actions.cancelPageByIdRequst())
      return
    }
    const page = yield PageService.getPage(action.payload)
    yield commentsActions.allCommentsFetched(page.commentsArr)
    yield put(actions.getPageByIdSuccess(page))
  } catch (e) {
    yield put(actions.getPageByIdError())
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
}
