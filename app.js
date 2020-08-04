const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const globalErrorHandler = require("./Controllers/errorController");
const apiRouter = require("./Routes/apiRoutes");
const userRouter = require("./Routes/userRoutes");
const viewRouter = require("./Routes/viewRoutes");
const app = express();

app.use(cors());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(morgan("dev"));

app.use("/", viewRouter);
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
