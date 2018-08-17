import * as commentsActionTypes from './commentsActionTypes'

const initialState = []

export default function commentReducer (state = initialState, action) {
  switch (action.type) {
    case commentsActionTypes.CREATE_COMMENT_SUCCESS:
      return action.payload.comment
    case commentsActionTypes.GET_ALL_COMMENTS_SUCCESS:
      return action.payload.comments
    default: return state
  }
}
