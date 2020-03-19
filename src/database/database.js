const mongoose = require("mongoose");
const mongodbUri = `mongodb://<dbuser>:<dbpassword>@ds349628.mlab.com:49628/covid`;
const chalk = require("chalk");

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    user: "erislandio",
    password: "Er1sl@ndio"
  }
});

const conn = mongoose.connection;

conn.on("error", console.error.bind(console, "Error!"));

conn.once("open", () => {
  console.log(chalk.bgMagenta(`connected to mlab!`));
});

mongoose.Promise = global.Promise;
module.exports = mongoose;
