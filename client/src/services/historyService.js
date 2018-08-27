import { callWebApi } from 'src/helpers/requestHelper'

class HistoryService {
  createHistory = (historyObj) => {
    const args = { endpoint: '/api/history', method: 'POST', body: JSON.stringify(historyObj) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  getAllUserHistory = () => {
    const args = { endpoint: '/api/history', method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  getUserHistory = (userId) => {
    const args = { endpoint: `/api/history/user/${userId}`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}

export default new HistoryService()
