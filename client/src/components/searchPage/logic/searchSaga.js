import ElasticsearchService from 'src/services/elasticsearchService'
import { takeEvery, put } from 'redux-saga/effects'
import * as actions from './searchActions'
import * as actionTypes from './searchActionsTypes'

function * search (action) {
  try {
    const result = yield ElasticsearchService.search(action.payload)
    console.log('RESULT')
    console.log(result)
    yield put(actions.searchSuccess({ items: result }))
  } catch (e) {
    console.log(e)
    yield put(actions.searchError(e))
  }
}

export default function * searchSaga () {
  yield takeEvery(actionTypes.SEARCH_REQUEST, search)
}
