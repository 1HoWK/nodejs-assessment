const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom");

// 403 Forbidden
class ForbiddenError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
