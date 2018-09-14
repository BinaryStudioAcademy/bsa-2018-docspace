export async function callWebApi (args) {
  try {
    const result = await fetch(args.endpoint, getFetchArgs(args))
    if (result.status === 404) {
      throw result
    }
    return result
  } catch (err) {
    throw err
  }
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
