import { callWebApi } from 'src/helpers/requestHelper'

class UserService {
  getUser (id) {
    const args = { endpoint: `/api/user/${id}`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

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

  compareUsers (data) {
    const args = { endpoint: `/api/user/compareUsers`, method: 'POST', body: JSON.stringify(data) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  sendAvatarFile (file, userId) {
    console.log('before sending', file)
    let fd = new FormData()
    fd.append('avatar', file)
    fd.append('userId', JSON.stringify({userId}))
    const args = { endpoint: `/api/upload/avatar`, method: 'POST', body: fd, hasOwnHeaders: true }
    const apiResult = callWebApi(args)
      .then(res => {
        console.log('HERE', res)
        return res.json()
      })
      .catch(err => console.log(err))
    return apiResult
  }

  getAllUsers () {
    const args = { endpoint: `/api/user`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => {
        console.log('HERE', res)
        return res.json()
      })
      .catch(err => console.log(err))
    return apiResult
  }
}

export const userService = new UserService()
