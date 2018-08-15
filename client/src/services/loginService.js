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
  verification (token) {
    return fetch('/api/autologin', {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
      .then(res => res.json())
      .then(user => user)
      .catch(err => console.log(`Can't get text: ${err}`))
  }
  logout () {
    return fetch('/api/logout')
      .then(res => res)
      .catch(err => console.log(`Can't get text: ${err}`))
  }
}

export const loginService = new LoginService()
