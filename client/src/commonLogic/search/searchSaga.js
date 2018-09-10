import { takeEvery, put } from 'redux-saga/effects'
import * as actionTypes from './searchActionTypes'
import * as actions from './searchActions'
import SearchService from 'src/services/searchService'

function * search (action) {
  try {
    const results = yield SearchService.search(action.payload)
    yield put(actions.searchSuccess(results, action.isAdvanced))
  } catch (e) {
    console.log(e)
    yield put(actions.searchError(e))
  }
}

function * advancedSearch (action) {
  try {
    const results = yield SearchService.search(action.payload)
    yield put(actions.advancedSearchSuccess(results))
  } catch (e) {
    console.log(e)
    yield put(actions.advancedSearchError(e))
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.SEARCH_REQUEST, search)
  yield takeEvery(actionTypes.ADVANCED_SEARCH_REQUEST, advancedSearch)
}
