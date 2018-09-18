import { UPDATE_SPACE_SUCCESS } from 'src/components/space/spaceContainer/logic/spaceActionTypes'
import { UPDATE_PAGE_SUCCESS } from 'src/components/page/logic/pageActionTypes'
import { UPDATE_SPACE_PERMISSIONS_SUCCESS } from 'src/components/space/spaceSettings/permissions/logic/permissionsActionsTypes'
import { CREATE_COMMENT_SUCCESS, EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS } from 'src/components/page/commentsLogic/commentsActionTypes'

const actionsToShare = [
  UPDATE_SPACE_SUCCESS,
  UPDATE_PAGE_SUCCESS,
  UPDATE_SPACE_PERMISSIONS_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  'ADD_WATCHER_SPACE_SUCCESS',
  'DELETE_WATCHER_SPACE_SUCCESS',
  'ADD_WATCHER_SUCCESS',
  'DELETE_WATCHER_SUCCESS'
]

export default actionsToShare
