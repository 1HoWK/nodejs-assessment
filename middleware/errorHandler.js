const { StatusCodes } = require("http-status-codes");

// handle to json from if not express will change it to html
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let error = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong on the server, try again later",
  };

  if (err.name === "ValidationError") {
    error.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(". ");
    error.statusCode = StatusCodes.BAD_REQUEST;
  }

  console.log(
    `[${new Date().toISOString()}] [ERROR] ${error.statusCode} on ${
      req.method
    } ${req.originalUrl} - ${error.msg}`
  );
  return res.status(error.statusCode).json({
    errors: error.msg,
  });
};

module.exports = errorHandlerMiddleware;
