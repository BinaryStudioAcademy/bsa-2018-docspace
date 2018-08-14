import { callWebApi } from '../requestHelper'

class UserService {
  updateUser (user) {
    const args = { endpoint: `/api/user/${user.id}/setting`, method: 'PUT', body: JSON.stringify(user) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  checkandUpdatePassword (data) {
    const args = { endpoint: `/api/user/changePassword`, method: 'POST', body: JSON.stringify(data) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}

export const userService = new UserService()
