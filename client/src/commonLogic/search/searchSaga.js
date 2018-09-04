import { takeEvery, put } from 'redux-saga/effects'
import * as actionTypes from './searchActionTypes'
import * as actions from './searchActions'
import SearchService from 'src/services/searchService'

function * search (action) {
  try {
    const results = yield SearchService.search(action.payload)
    yield put(actions.searchSuccess(results))
  } catch (e) {
    console.log(e)
    yield put(actions.searchError(e))
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.SEARCH_REQUEST, search)
}
