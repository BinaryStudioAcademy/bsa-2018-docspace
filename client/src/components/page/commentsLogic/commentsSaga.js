import { takeEvery, put } from 'redux-saga/effects'
import * as actions from './commentsActions'
import * as actionTypes from './commentsActionTypes'
import {commentService} from '../../../services/commentService'
import * as pageAction from '../logic/pageActions'

function * getComments (action) {
  try {
    const comments = yield commentService.getComments(action.payload)
    yield put(actions.allCommentsFetched(comments))
  } catch (e) {
    yield put(actions.getAllCommentsFailure())
  }
}

// function * createComment (action) {
//   try {
//     const comment = yield commentService.createComment(action.payload.comment)
//     action.payload.page.comments.push(comment._id)
//     const newComments = [...action.payload.page.commentsArr]
//     newComments.push(comment)
//     yield put(actions.addCommentSuccessfully(newComments))

//     if (action.payload.page.spaceId) {
//       yield put(pageAction.updatePageRequest(action.payload.page))
//     } else {
//       yield put(pageAction.updateBlogPageRequest(action.payload.page))
//     }
//   } catch (e) {
//     yield put(actions.addCommentFailure())
//   }
// }

function * createComment (action) {
  const {comment, page} = action.payload
  try {
    const savedComment = yield commentService.createComment(comment, page._id)
    page.comments.push(savedComment)
    yield put(actions.addCommentToPageSuccess(page))
  } catch (e) {
    yield put(actions.addCommentFailure())
  }
}

function * editComment (action) {
  try {
    yield commentService.editComment(action.payload.comment._id, action.payload.comment)

    if (action.payload.page.spaceId) {
      yield put(pageAction.updatePageRequest(action.payload.page))
    } else {
      yield put(pageAction.updateBlogPageRequest(action.payload.page))
    }
  } catch (e) {
    yield put(actions.editCommentFailure())
  }
}

function * deleteComment (action) {
  try {
    yield commentService.deleteComment(action.payload.comment._id)
    const commentsRemoved = action.payload.page.comments.filter(_id => _id !== action.payload.comment._id)
    action.payload.page.comments = commentsRemoved

    if (action.payload.page.spaceId) {
      yield put(pageAction.updatePageRequest(action.payload.page))
    } else {
      yield put(pageAction.updateBlogPageRequest(action.payload.page))
    }
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
