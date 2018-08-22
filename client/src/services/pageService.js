import { callWebApi } from 'src/helpers/requestHelper'
class PageService {
  getPages = () => {
    const args = { endpoint: '/api/pages', method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  getPage = (id) => {
    const args = { endpoint: `/api/pages/${id}`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  createPage = (pageObj) => {
    const args = { endpoint: `/api/pages`, method: 'POST', body: JSON.stringify(pageObj) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  deletePage = (page) => {
    const args = { endpoint: `/api/pages/${page._id}`, method: 'DELETE' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  updatePage = (newPage) => {
    const args = { endpoint: `/api/pages/${newPage._id}`, method: 'PUT', body: JSON.stringify(newPage) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  async sendDocFile (file) {
    console.log('before sending', file)
    let fd = new FormData()
    fd.append('docfile', file)
    const result = await fetch('/convert', { method: 'POST',
      body: fd })
      .then(res => res.json())
      .catch(err => console.log(err))
    return result
  }
}

export default new PageService()
