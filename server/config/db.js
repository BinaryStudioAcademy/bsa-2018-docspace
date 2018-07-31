module.exports = {
    dbname: "wiki",
    uri: "mongodb://localhost:27017/wiki",
    opts: {
      auto_reconnect: true,
      poolSize: 40,
      useNewUrlParser: true
    }
  };
  