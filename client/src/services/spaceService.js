class SpaceService {
  getSpaces = () => (
    fetch('/api/spaces', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      .then(res => res.json())
      .then(spaces => spaces)
      .catch(err => console.log(`Can't get spaces: ${err}`))
  )

  getSpace = (id) => (
    fetch(`/api/spaces/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      .then(res => res.json())
      .then(space => space)
      .catch(err => console.log(`Can't get space: ${err}`))
  )

  createSpace = (spaceObj) => (
    fetch('/api/spaces', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(spaceObj)
    })
      .then(res => res.json())
      .then(space => space)
      .catch(err => console.log(`Can't create space: ${err}`))
  )

  deleteSpace = (id) => (
    fetch(`/api/spaces/${id}`,
      { method: 'DELETE',
        headers:
      {'Authorization': `Bearer ${localStorage.getItem('token')}`} })
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log(`Can't delete space: ${err}`))
  )

  updateSpace = (id, newSpace) => (
    fetch(`/api/spaces/${id}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify(newSpace)
    })
      .then(res => res.json())
      .then(updatedSpace => updatedSpace)
      .catch(err => console.log(`Can't update space: ${err}`))
  )
}

export default new SpaceService()
