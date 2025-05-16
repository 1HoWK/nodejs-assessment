const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom");

// 400 Bad Request
class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
