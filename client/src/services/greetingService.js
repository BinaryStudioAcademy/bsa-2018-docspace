class GreetingService {
  getGreetingText () {
    return fetch('/api/user/5b65b78531ac487f408d9de8')
      .then(res => res.json())
      .then(greeting => greeting)
      .catch(err => console.log(`Can't get text: ${err}`))
  }
}

export const greetingService = new GreetingService()
