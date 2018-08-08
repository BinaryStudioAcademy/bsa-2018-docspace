class SpaceService {
  getSpaces = () => (
    fetch('/api/spaces')
      .then(res => res.json())
      .then(spaces => spaces)
      .catch(err => console.log(`Can't get spaces: ${err}`))
  )

  createSpace = (spaceObj) => (
    fetch('/api/spaces', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(spaceObj)
    })
      .then(res => res.json())
      .then(space => space)
      .catch(err => console.log(`Can't create space: ${err}`))
  )

  deleteSpace = (id) => (
    fetch('/api/spaces/:id', { method: 'DELETE' })
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log(`Can't delete space: ${err}`))
  )

  updateSpace = (id, newSpace) => (
    fetch('/api/spaces/:id', {
      method: 'UPDATE',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newSpace)
    })
      .then(res => res.json())
      .then(updatedSpace => updatedSpace)
      .catch(err => console.log(`Can't update space: ${err}`))

  )
}

export const spaceService = new SpaceService()
