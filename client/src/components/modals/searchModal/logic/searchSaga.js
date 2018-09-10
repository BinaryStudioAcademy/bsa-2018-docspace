import { takeEvery, put } from 'redux-saga/effects'
import * as actionTypes from './searchActionType'
import * as actions from './searchActions'
import pageService from 'src/services/pageService'

function * getMatchingPages (action) {
  try {
    const pages = yield pageService.findByCriteria(action.payload)
    yield put(actions.getMatchingPagesSuccess(pages))
  } catch (e) {
    console.log(e)
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_MATCHING_PAGES_REQUEST, getMatchingPages)
}
