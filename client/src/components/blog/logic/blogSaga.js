import { takeEvery, put } from 'redux-saga/effects'
import * as actions from './blogActions'
import * as actionTypes from './blogActionTypes'
import BlogService from 'src/services/blogService'

function * getBlog (action) {
  try {
    const blog = yield BlogService.getBlog(action.payload)
    console.log('IN SAGA')
    console.log(blog)
    yield put(actions.getBlogSuccess(blog))
  } catch (e) {
    console.log(e)
    yield put(actions.getBlogError())
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_BLOG_REQUEST, getBlog)
}
