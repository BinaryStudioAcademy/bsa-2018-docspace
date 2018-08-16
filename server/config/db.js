let config = {
  production: {
    dbname: 'docspace',
    uri: 'mongodb://admin:admin12345@ds113482.mlab.com:13482/docspace',
    opts: {
      auto_reconnect: true,
      poolSize: 40,
      useNewUrlParser: true
    }
  },
  default: {
    dbname: 'docspace',
    uri: 'mongodb://localhost:27017/docspace',
    opts: {
      auto_reconnect: true,
      poolSize: 40,
      useNewUrlParser: true
    }
  }
}

module.exports.get = function get(env) {
  return config[env] || config.default;
};
