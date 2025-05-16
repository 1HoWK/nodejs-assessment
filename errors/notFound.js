const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom");

// 404 Not Found
class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
