import { callWebApi } from 'src/helpers/requestHelper'

class LoginService {
  login (data) {
    const args = { endpoint: '/api/login', method: 'POST', body: JSON.stringify(data) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
  verification () {
    const args = { endpoint: '/api/autologin', method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
  logout () {
    localStorage.removeItem('token')
  }
}

export const loginService = new LoginService()
