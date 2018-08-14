
const getPageIdFromRouterLocation = (location) => {
  const pageIdRegExp = /(?:pages[/])([^[/]*)(?:\/.*|$)/
  const matched = location.pathname.match(pageIdRegExp)
  return matched.length > 1 ? matched[1] : null
}

export default getPageIdFromRouterLocation
