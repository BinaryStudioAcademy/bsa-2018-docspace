function dbConnectionHandler() {
  const mongoose = require("mongoose");
  const config = require("../config/db");
  console.log(config.uri, config.opts);
  mongoose.connect(config.uri, config.opts);

  mongoose.set("debug", true);

  this.connection = mongoose.connection;

  mongoose.connection.on("connected", function () {
    console.log("DB connect");
    this.state = "connected";
  });

  mongoose.connection.on("error", function (err) {
    console.log("DB disconnected(error)");
    this.state = "disconnected";
  });

  mongoose.connection.on("disconnected", function () {
    console.log("DB disconnected");
    this.state = "disconnected";
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      this.state = "disconnected";
      process.exit(0);
    });
  });
}

module.exports = new dbConnectionHandler();