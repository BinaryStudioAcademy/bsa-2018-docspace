import { takeEvery, put } from 'redux-saga/effects'
import * as actionTypes from './likesActionTypes'
import * as actions from './likesAction'
import pageService from 'src/services/pageService'
import {commentService} from 'src/services/commentService'

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
    // console.log('delete')
    // console.log(action.payload)
    console.log(action.payload.page)
    const deletedLike = action.payload.page.usersLikes.filter(userLike => userLike !== action.payload.userId)
    console.log(deletedLike)
    console.log(action.payload.userId)
    action.payload.page.usersLikes = deletedLike
    console.log(action.payload.page)
    const updatedPage = yield pageService.updatePage(action.payload.page)
    yield put(actions.deleteLikeSuccess(updatedPage))
    console.log(updatedPage)
  } catch (e) {
    console.log(e)
  }
}

function * putLikeOnComment (action) {
  const {userId, comment, page} = action.payload
  try {
    const likedComment = yield commentService.likeComment(comment._id, userId, true)
    console.log(likedComment)
    yield put(actions.putLikeSuccess(page, likedComment))
  } catch (e) {
    console.log(e)
  }
}

function * deleteLikeFromComment (action) {
  try {
    console.log(action.payload)
    const deletedLike = action.payload.comment.userLikes.filter(userLike => userLike !== action.payload.userId)
    action.payload.comment.userLikes = deletedLike
    yield commentService.editComment(action.payload.comment._id, action.payload.comment)
    const updatedPage = yield pageService.updatePage(action.payload.page)
    yield put(actions.deleteLikeSuccess(updatedPage))
  } catch (e) {
    console.log(e)
  }
}
export default function * selectionsSaga () {
  yield takeEvery(actionTypes.PUT_LIKE_REQUEST, putLike)
  yield takeEvery(actionTypes.DELETE_LIKE_REQUEST, deleteLike)
  yield takeEvery(actionTypes.PUT_LIKE_ON_COMMENT_REQUEST, putLikeOnComment)
  yield takeEvery(actionTypes.DELETE_LIKE_FROM_COMMENT_REQUEST, deleteLikeFromComment)
}
