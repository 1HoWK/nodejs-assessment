const { StatusCodes } = require("http-status-codes");

// handle to json from if not express will change it to html
const errorHandlerMiddleware = (err, req, res, next) => {
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
  if (err.code && err.code === 11000) {
    error.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    error.statusCode = StatusCodes.BAD_REQUEST;
  }
  console.log(
    `[${new Date().toISOString()}] [ERROR] ${error.statusCode} ${req.method} ${
      req.originalUrl
    } - Response: ${JSON.stringify({ errors: error.msg }, null, null)}`
  );
  return res.status(error.statusCode).json({
    errors: error.msg,
  });
};

module.exports = errorHandlerMiddleware;
