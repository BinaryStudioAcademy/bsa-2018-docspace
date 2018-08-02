module.exports = {
  dbname: 'docspace',
  uri: 'mongodb://localhost:27017/docspace',
  opts: {
    auto_reconnect: true,
    poolSize: 40,
    useNewUrlParser: true
  }
}
