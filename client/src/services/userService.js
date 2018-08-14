import requestHelper from 'src/requestHelper'

class UserService {
  updateUser (user) {
    return requestHelper(`/api/user/${user.id}/setting`, 'PUT', user)
  }

  checkandUpdatePassword (data) {
    return requestHelper('/api/user/changePassword', 'POST', data)
  }
}

export const userService = new UserService()
