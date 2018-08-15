import { callWebApi } from 'src/requestHelper'

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
    return fetch('/api/logout')
      .then(res => res)
      .catch(err => console.log(`Can't get text: ${err}`))
  }
}

export const loginService = new LoginService()
