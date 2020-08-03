const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      error: err,
      stack: err.stack,
      status: err.status,
      message: err.message,
    });
  }
  console.error("Error :/", err);
  res.status(err.statusCode).render("error", {
    title: "Something went Wrong",
    msg: err.message,
  });
};

module.exports = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  sendErrorDev(err, req, res);
};
