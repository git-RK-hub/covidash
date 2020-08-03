const mongoose = require("mongoose");
const config = require("./utils/config");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Reload the server");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = 8888;

mongoose
  .connect(config.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log("DB connection successfully"))
  .catch((err) => console.error(err));

app.listen(port, "127.0.0.1", (err) => {
  if (!err) console.log("Server running on port : " + port);
  else console.log(err);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDELED REJECTION! Try to reload the server");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
