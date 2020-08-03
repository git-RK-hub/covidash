const express = require("express");
const morgan = require("morgan");
const passport = require("passport");

const globalErrorHandler = require("./Controllers/errorController");
const apiRouter = require("./Routes/apiRoutes");
const userRouter = require("./Routes/userRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(morgan("dev"));

app.use("/api/v1/covidash", apiRouter);
app.use("/api/v1/covidash/users", userRouter);

app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Error",
    message: `Can't find the ${req.originalUrl} for this server`,
  });
});

module.exports = app;
