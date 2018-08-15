import { callWebApi } from 'src/requestHelper'

class SpaceService {
  getSpaces = () => {
    const args = { endpoint: `/api/spaces`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  getSpace = (id) => {
    const args = { endpoint: `/api/spaces/${id}`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  createSpace = (spaceObj) => {
    const args = { endpoint: '/api/spaces', method: 'POST', body: JSON.stringify(spaceObj) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  deleteSpace = (id) => {
    const args = { endpoint: `/api/spaces/${id}`, method: 'DELETE' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  updateSpace = (id, newSpace) => {
    const args = { endpoint: `/api/spaces/${id}`, method: 'PUT', body: JSON.stringify(newSpace) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}

export default new SpaceService()
