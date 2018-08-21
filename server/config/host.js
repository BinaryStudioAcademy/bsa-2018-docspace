let config = {
  production: {
    url: 'https://docspace.herokuapp.com/'
  },
  default: {
    url: 'http://localhost:3000/'
  }
}

module.exports.get = function get (env) {
  return config[env] || config.default
}
