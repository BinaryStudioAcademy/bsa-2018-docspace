const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const ES_HOST = process.env.ES_HOST

const config = {
  mongodb: {
    production: {
      dbname: 'docspace',
      uri: `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@ds113482.mlab.com:13482/docspace`,
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
  },
  elasticsearch: {
    production: {
      host: ES_HOST,
      port: 9200
    },
    default: {
      host: 'localhost',
      port: 9200
    }
  }
}

module.exports.get = function get (db, env) {
  return config[db][env] || config[db].default
}
