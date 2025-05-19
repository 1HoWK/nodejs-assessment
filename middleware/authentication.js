const {
  ForbiddenError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../errors/index");
const { verifyToken } = require("../utils/jwt");

const authentication = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  // console.log(authorizationHeader);
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authentication failed");
  }
  const token = authorizationHeader.split(" ")[1];
  // console.log(token);
  try {
    const payload = verifyToken(token);
    // console.log(payload);
    req.user = {
      userid: payload.userid,
      username: payload.username,
    };
    next();
  } catch (error) {
    throw new UnauthorizedError("Authentication failed");
  }
};

module.exports = authentication;
