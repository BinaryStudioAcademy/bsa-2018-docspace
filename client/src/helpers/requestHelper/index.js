export function callWebApi (args) {
  const result = fetch(args.endpoint, getFetchArgs(args))
  return result
}

function getFetchArgs (args) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
  const {body, method} = args
  return {
    method,
    headers,
    body
  }
}
