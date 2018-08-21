import { callWebApi } from 'src/helpers/requestHelper'

class GroupService {
    createGroup = (newGroup) => {
      const args = {endpoint: '/api/groups', method: 'POST', body: JSON.stringify(newGroup)}
      const apiResult = callWebApi(args)
        .then(res => res.json())
        .catch(err => console.log(`Error: ${err}`))
      return apiResult
    }
}

export const groupService = new GroupService()
