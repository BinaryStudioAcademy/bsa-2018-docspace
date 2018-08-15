import { callWebApi } from 'src/helpers/requestHelper'

class SignupService {
  signup (data) {
    const args = { endpoint: '/api/signup', method: 'POST', body: JSON.stringify(data) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}

export const signupService = new SignupService()
