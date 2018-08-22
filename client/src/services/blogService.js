import { callWebApi } from 'src/helpers/requestHelper'

class BlogService {
  getBlog = (id) => {
    const args = { endpoint: `/api/blog/${id}`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Can not get blog: ${err}`))
    return apiResult
  }
}

export default new BlogService()
