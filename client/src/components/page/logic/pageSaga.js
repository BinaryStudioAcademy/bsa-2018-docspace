import { takeEvery, put } from 'redux-saga/effects'
import * as actions from './pageActions'
import * as actionTypes from './pageActionTypes'
import PageService from 'src/services/pageService'
import { normalize } from 'normalizr'
import { pagesArray } from './pagesNormalizerSchema'

function * getPages (action) {
  try {
    const pages = yield PageService.getPages()
    const normalized = normalize(pages, pagesArray)
    const all = normalized.result
    const byId = normalized.entities.byId || {}
    yield put(actions.allPagesFetchedAndNormalized(all, byId))
  } catch (e) {
    yield put(actions.getAllPagesError())
  }
}

function * createPage (action) {
  try {
    const newPage = yield PageService.createPage(action.payload)
    yield put(actions.createPageSuccess(newPage))
  } catch (e) {
    yield put(actions.createPageError())
  }
}

function * updatePage (action) {
  try {
    const target = action.payload
    const updated = yield PageService.updatePage(target._id, target)
    yield put(actions.updatePageSuccess(updated))
  } catch (e) {
    yield put(actions.updatePageError())
  }
}

function * deletePage (action) {
  try {
    yield PageService.deletePage(action.payload.id)
    yield put(actions.deletePageSuccess(action.payload.id))
  } catch (e) {
    yield put(actions.deletePageError())
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_ALL_PAGES_REQUEST, getPages)
  yield takeEvery(actionTypes.CREATE_PAGE_REQUEST, createPage)
  yield takeEvery(actionTypes.DELETE_PAGE_REQUEST, deletePage)
  yield takeEvery(actionTypes.UPDATE_PAGE_REQUEST, updatePage)
}
