class LoginService {
  login (data) {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(user => user)
      .catch(err => console.log(`Can't get text: ${err}`))
  }
  verification () {
    return fetch('/api/login', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(user => user)
      .catch(err => console.log(`Can't get text: ${err}`))
  }
}

export const loginService = new LoginService()
