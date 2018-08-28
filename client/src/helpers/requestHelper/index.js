export async function callWebApi (args) {
  const result = await fetch(args.endpoint, getFetchArgs(args))
  return result
}

function getFetchArgs (args) {
  const headers = !args.hasOwnHeaders
    ? {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    : {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  const { body, method } = args

  return {
    method,
    headers,
    body
  }
}
