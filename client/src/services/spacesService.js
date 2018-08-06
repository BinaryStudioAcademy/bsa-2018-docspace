class GreetingService {
  getGreetingText () {
    return fetch('/api/spaces')
      .then(res => res.json())
      .then(greeting => greeting)
      .catch(err => console.log(`Can't get text: ${err}`))
  }
}

export const greetingService = new GreetingService()
