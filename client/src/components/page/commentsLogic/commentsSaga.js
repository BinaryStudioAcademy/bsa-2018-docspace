import { takeEvery, put } from 'redux-saga/effects'
import * as actions from './commentsActions'
import * as actionTypes from './commentsActionTypes'
import {commentService} from '../../../services/commentService'
import * as pageAction from '../logic/pageActions'

function * getComments (action) {
  try {
    const comments = yield commentService.getComments(action.payload)
    console.log('its saga')
    console.log(comments)
    yield put(actions.allCommentsFetched(comments))
  } catch (e) {
    yield put(actions.getAllCommentsFailure())
  }
}

function * createComment (action) {
  try {
    const comment = yield commentService.createComment(action.payload.comment)
    action.payload.page.comments.push(comment._id)
    action.payload.page.commentsArr.push(comment)
    yield put(actions.addCommentSuccessfully(action.payload.page.commentsArr))
    yield put(pageAction.updatePageRequest(action.payload.page))
  } catch (e) {
    yield put(actions.addCommentFailure())
  }
}

function * editComment (action) {
  try {
    const comments = yield commentService.editComment(action.payload.commentId, action.payload.comment)
    console.log(comments)
  } catch (e) {
    yield put(actions.editCommentFailure())
  }
}

function * deleteComment (action) {
  try {
    const comments = yield commentService.deleteComment(action.payload.commentId)
    console.log(comments)
  } catch (e) {
    yield put(actions.deleteCommentFailure())
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_ALL_COMMENTS_REQUEST, getComments)
  yield takeEvery(actionTypes.CREATE_COMMENT_REQUEST, createComment)
  yield takeEvery(actionTypes.DELETE_COMMENT_REQUEST, deleteComment)
  yield takeEvery(actionTypes.EDIT_COMMENT_REQUEST, editComment)
}
