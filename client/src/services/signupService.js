class SignupService {
  signup (email, fullName, password) {
    return fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, fullName, password})
    })
      .then(res => res.json())
      .then(user => user)
      .catch(err => console.log(`Can't get text: ${err}`))
  }
}

export const signupService = new SignupService()
