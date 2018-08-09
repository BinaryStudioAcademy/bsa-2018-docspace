class UserService {
  getUserData (id) {
    return fetch(`/api/user/${id}`)
      .then(res => res.json())
      .then(user => user)
      .catch(err => console.log(`Can't get user: ${err}`))
  }

  updateUser (user) {
    return fetch(`/api/user/${user.id}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .catch(err => console.log(`Can't get user: ${err}`))
  }
}

export const userService = new UserService()
