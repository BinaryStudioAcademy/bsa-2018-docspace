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
    const args = { endpoint: '/api/login', method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}

export const loginService = new LoginService()
