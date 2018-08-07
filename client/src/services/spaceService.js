class SpaceService {
  getSpace (key) {
    return fetch(`/api/spaces/${key}`)
      .then(res => res.json())
      .then(space => space)
      .catch(err => console.log(`Can't get space: ${err}`))
  }
}

export const spaceService = new SpaceService()
