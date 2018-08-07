class SpacesService {
  getSpaces () {
    return fetch('/api/spaces')
      .then(res => res.json())
      .then(spaces => spaces)
      .catch(err => console.log(`Can't get text: ${err}`))
  }
}

export const spacesService = new SpacesService()
