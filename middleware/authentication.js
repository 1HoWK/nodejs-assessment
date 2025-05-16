const { ForbiddenError, BadRequestError } = require("../errors/index");
const { generateToken, verifyToken } = require("../utils/jwt");

const auth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new ForbiddenError("Authentication invalid");
  }
  const token = authorizationHeader.split(" ")[1];
  try {
    const payload = verifyToken(token);
    // req.user = { userId: payload.userId, name: payload.name };
    console.log(payload);
    req.user = {
      userid: payload.userid,
      displayusername: payload.displayusername,
    };
    next();
  } catch (error) {
    throw new ForbiddenError("Authentication invalid");
  }
};

module.exports = auth;
