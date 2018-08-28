import { callWebApi } from 'src/helpers/requestHelper'

class HistoryService {
  createHistory = (historyObj) => {
    const args = { endpoint: '/api/history', method: 'POST', body: JSON.stringify(historyObj) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  getAllUserHistory = (userId) => {
    const args = { endpoint: '/api/history', method: 'GET', body: JSON.stringify(userId) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  getUserHistory = (userLogin) => {
    const args = { endpoint: `/api/history/user/${userLogin}`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}

export default new HistoryService()
