import { callWebApi } from 'src/helpers/requestHelper'

class ResetService {
  reset (data) {
    const args = { endpoint: '/reset', method: 'POST', body: JSON.stringify(data) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  resetNewPass (data) {
    const args = { endpoint: '/reset/:token', method: 'POST', body: JSON.stringify(data) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}

export const resetService = new ResetService()
