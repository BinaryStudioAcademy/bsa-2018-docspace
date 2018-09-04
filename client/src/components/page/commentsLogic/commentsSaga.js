import { takeEvery, put } from 'redux-saga/effects'
import * as actions from './commentsActions'
import * as actionTypes from './commentsActionTypes'
import {commentService} from '../../../services/commentService'

function * getComments (action) {
  try {
    const comments = yield commentService.getComments(action.payload)
    yield put(actions.allCommentsFetched(comments))
  } catch (e) {
    yield put(actions.getAllCommentsFailure())
  }
}

function * createComment (action) {
  const {comment, page} = action.payload
  try {
    const savedComment = yield commentService.createComment(comment, page._id)
    yield put(actions.addCommentToPageSuccess(page, savedComment))
  } catch (e) {
    yield put(actions.addCommentFailure())
  }
}

function * editComment (action) {
  const {comment, page} = action.payload
  try {
    const editedComment = yield commentService.editComment(comment._id, comment)
    yield put(actions.editCommentSuccess(page, editedComment))
  } catch (e) {
    console.log(e)
    yield put(actions.editCommentFailure())
  }
}

function * deleteComment (action) {
  const {comment, page} = action.payload
  try {
    const deletedComment = yield commentService.deleteComment(comment._id, page._id)
    yield put(actions.deleteCommentSuccess(page, deletedComment))
  } catch (e) {
    console.log(e)
    yield put(actions.deleteCommentFailure())
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_ALL_COMMENTS_REQUEST, getComments)
  yield takeEvery(actionTypes.CREATE_COMMENT_REQUEST, createComment)
  yield takeEvery(actionTypes.DELETE_COMMENT_REQUEST, deleteComment)
  yield takeEvery(actionTypes.EDIT_COMMENT_REQUEST, editComment)
}
