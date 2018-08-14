class PageService {
  getPages = () => (
    fetch('/api/pages')
      .then(res => res.json())
      .then(pages => pages)
      .catch(err => console.log(`Can't get pages: ${err}`))
  )

  getPage = (id) => (
    fetch(`/api/pages/${id}`)
      .then(res => res.json())
      .then(page => page)
      .catch(err => console.log(`Can't get page: ${err}`))
  )

  createPage = (pageObj) => (
    fetch('/api/pages', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(pageObj)
    })
      .then(res => res.json())
      .then(page => page)
      .catch(err => console.log(`Can't create page: ${err}`))
  )

  deletePage = (id) => (
    fetch(`/api/pages/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log(`Can't delete page: ${err}`))
  )

  updatePage = (newPage) => (
    fetch(`/api/pages/${newPage._id}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newPage)
    })
      .then(res => res.json())
      .then(updatedPage => updatedPage)
      .catch(err => console.log(`Can't update page: ${err}`))
  )
}

export default new PageService()
