import { callWebApi } from 'src/helpers/requestHelper'

class SearchService {
  search (searchQueryObject) {
    const args = { endpoint: '/api/search', method: 'POST', body: JSON.stringify(searchQueryObject) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}

export default new SearchService()
