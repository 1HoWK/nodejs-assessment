const { StatusCodes } = require("http-status-codes");

// handle to json from if not express will change it to html
const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(err.statusCode).json({
    errors: err.message,
  });
};

module.exports = errorHandlerMiddleware;
