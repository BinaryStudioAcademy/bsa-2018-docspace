const requestHelper = (endpoint, methodType, data) => {
  switch (methodType) {
    case 'POST':
    case 'PUT':
    {
      return fetch(endpoint, {
        method: methodType,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .catch(err => console.log(`Error: ${err}`))
    }
    case 'GET':
    {
      return fetch(endpoint)
        .then(res => res.json())
        .catch(err => console.log(`Error: ${err}`))
    }
    case 'DELETE':
    {
      return fetch(endpoint, {
        method: methodType
      })
        .then(res => res.json())
        .catch(err => console.log(`Error: ${err}`))
    }
    default: return null
  }
}

export default requestHelper
