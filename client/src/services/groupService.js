import { callWebApi } from 'src/helpers/requestHelper'

class GroupService {
  getAllUserGroups = (userId) => {
    const args = {endpoint: `/api/groups/user/${userId}`, method: 'GET'}
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  createGroup = (newGroup) => {
    const args = {endpoint: '/api/groups', method: 'POST', body: JSON.stringify(newGroup)}
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}

export const groupService = new GroupService()
