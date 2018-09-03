import { callWebApi } from 'src/helpers/requestHelper'
class PermissionsService {
  getSpacePermissions = (spaceId) => {
    const args = { endpoint: `/api/spaces/${spaceId}/permissions`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  createUserPermissions = (permissions) => {
    const args = {
      endpoint: `/api/spaces/${permissions.spaceId}/users_permissions`,
      method: 'POST',
      body: JSON.stringify(permissions)
    }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  createGroupPermissions = (permissions) => {
    const args = {
      endpoint: `/api/spaces/${permissions.spaceId}/groups_permissions`,
      method: 'POST',
      body: JSON.stringify(permissions)
    }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  updateManyPermissionsObjects = (permissionsObjectsArr) => {
    const args = { endpoint: `/api/permissions/update_many`, method: 'POST', body: JSON.stringify(permissionsObjectsArr) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}

export default new PermissionsService()

// '/:space_id/users_permissions'
