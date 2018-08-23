import { takeEvery, put } from 'redux-saga/effects'
import * as actionTypes from './likesActionTypes'
import * as actions from './likesAction'
import pageService from 'src/services/pageService'

function * putLike (action) {
  try {
    // const users = yield groupService.getMatchingUsers(action.payload)
    // yield put(actions.getAllUserGroupsSuccess(users))
    console.log('put')
    console.log(action.payload)
    action.payload.page.usersLikes.push(action.payload.userId)
    console.log(action.payload.page)

    const updatedPage = yield pageService.updatePage(action.payload.page)
    console.log(updatedPage)
    yield put(actions.putLikeSuccess(updatedPage))
  } catch (e) {
    console.log(e)
  }
}

function * deleteLike (action) {
  try {
    console.log('delete')
    console.log(action.payload)
    const deletedLike = action.payload.page.usersLikes.filter(likerId => likerId !== action.payload.userId)
    action.payload.page.usersLikes = deletedLike
    console.log(action.payload.page)
    const updatedPage = yield pageService.updatePage(action.payload.page)
    yield put(actions.deleteLikeSuccess(updatedPage))
    console.log(updatedPage)
  } catch (e) {
    console.log(e)
  }
}
export default function * selectionsSaga () {
  yield takeEvery(actionTypes.PUT_LIKE_REQUEST, putLike)
  yield takeEvery(actionTypes.DELETE_LIKE_REQUEST, deleteLike)
}
