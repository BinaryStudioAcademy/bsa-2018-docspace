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

  getMatchingUsers = (keyword) => {
    const args = {endpoint: `/api/user/name/${keyword}`, method: 'GET'}
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  findById = (id) => {
    const args = {endpoint: `/api/groups/${id}`, method: 'GET'}
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => { throw err })
    return apiResult
  }

  updateGroup = (newGroup) => {
    const args = {endpoint: `/api/groups/${newGroup._id}`, method: 'PUT', body: JSON.stringify(newGroup)}
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  deleteGroup = (id) => {
    const args = {endpoint: `/api/groups/${id}`, method: 'DELETE'}
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
  sendInvitation = (usersInGroup) => {
    const args = {endpoint: '/api/mail/sendInvite', method: 'POST', body: JSON.stringify(usersInGroup)}
    callWebApi(args)
  }
}

export const groupService = new GroupService()
