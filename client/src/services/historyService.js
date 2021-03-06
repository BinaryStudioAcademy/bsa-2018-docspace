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
  getCurrentUserHistory = (userId) => {
    const args = { endpoint: `/api/history/current-user/${userId}`, method: 'GET' }
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
  getUserWorks = (userId) => {
    const args = { endpoint: `/api/history/userWorks/${userId}`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}

export default new HistoryService()
