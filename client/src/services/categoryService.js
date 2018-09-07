import { callWebApi } from 'src/helpers/requestHelper'

class CategoryService {
  getCategories () {
    const args = { endpoint: `/api/category`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  getCategory (id) {
    const args = { endpoint: `/api/category/${id}`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  createCategory = (CategoryObj) => {
    const args = { endpoint: '/api/category', method: 'POST', body: JSON.stringify(CategoryObj) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  deleteCategory = (categoryId, spaceId) => {
    const args = { endpoint: `/api/category/${categoryId}`, method: 'DELETE', body: JSON.stringify({spaceId}) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}

export default new CategoryService()
