import { UPDATE_SPACE_SUCCESS } from 'src/components/space/spaceContainer/logic/spaceActionTypes'
import { UPDATE_PAGE_SUCCESS } from 'src/components/page/logic/pageActionTypes'
import { UPDATE_SPACE_PERMISSIONS_SUCCESS } from 'src/components/space/spaceSettings/permissions/logic/permissionsActionsTypes'

const actionsToShare = [
  UPDATE_SPACE_SUCCESS,
  UPDATE_PAGE_SUCCESS,
  UPDATE_SPACE_PERMISSIONS_SUCCESS
]

export default actionsToShare
