import { takeEvery, put } from 'redux-saga/effects'
import * as actionTypes from './likesActionTypes'
import * as actions from './likesAction'
import pageService from 'src/services/pageService'
import {commentService} from 'src/services/commentService'

function * putLikeOnPage (action) {
  const {user, page} = action.payload
  try {
    const liked = yield pageService.likePage(page._id, user._id, true)
    if (liked) {
      let likedUser = {_id: user._id, firstName: user.firstName, lastName: user.lastName}
      yield put(actions.putLikeOnPageSuccess(page, likedUser))
    }
    throw liked
  } catch (e) {
    console.log(e)
  }
}

function * deleteLikeFromPage (action) {
  console.log(action.payload)
  const {user, page} = action.payload
  try {
    const unliked = yield pageService.likePage(page._id, user._id, false)
    if (unliked) {
      let unlikedUser = {_id: user._id, firstName: user.firstName, lastName: user.lastName}
      yield put(actions.deleteLikeFromPageSuccess(page, unlikedUser))
    }
    throw unliked
  } catch (e) {
    console.log(e)
  }
}

function * putLikeOnComment (action) {
  const {userId, comment, page} = action.payload
  try {
    const likedComment = yield commentService.likeComment(comment._id, userId, true)
    yield put(actions.putLikeOnCommentSuccess(page, likedComment))
  } catch (e) {
    console.log(e)
  }
}

function * deleteLikeFromComment (action) {
  const {userId, comment, page} = action.payload
  try {
    const unlikedComment = yield commentService.likeComment(comment._id, userId, false)
    yield put(actions.deleteLikeFromCommentSuccess(page, unlikedComment))
  } catch (e) {
    console.log(e)
  }
}
export default function * selectionsSaga () {
  yield takeEvery(actionTypes.PUT_LIKE_ON_PAGE_REQUEST, putLikeOnPage)
  yield takeEvery(actionTypes.DELETE_LIKE_FROM_PAGE_REQUEST, deleteLikeFromPage)
  yield takeEvery(actionTypes.PUT_LIKE_ON_COMMENT_REQUEST, putLikeOnComment)
  yield takeEvery(actionTypes.DELETE_LIKE_FROM_COMMENT_REQUEST, deleteLikeFromComment)
}
