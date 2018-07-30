class GreetingService {
    getGreetingText() {
        return fetch('/api/hello')
            .then(res => res.json())
            .then(greeting => greeting)
            .catch(err => console.log(`Can't get text: ${err}`));
    }
}

export const greetingService = new GreetingService();