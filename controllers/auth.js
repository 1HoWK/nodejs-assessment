const { StatusCodes } = require("http-status-codes");
const {
  ForbiddenError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../errors/index");
const { generateToken, verifyToken } = require("../utils/jwt");
const User = require("../models/User");

const register = async (req, res) => {
  const { username, displayusername, password } = req.body;
  const registeredUser = await User.create({
    username,
    displayusername,
    password,
  });
  console.log(
    `[${new Date().toISOString()}] [INFO] ${StatusCodes.OK} ${req.method} ${
      req.originalUrl
    } - Response: ${JSON.stringify(
      {
        displayusername: registeredUser.displayusername,
        userid: registeredUser.userid,
      },
      null,
      null
    )}`
  );
  res.status(StatusCodes.OK).json({
    displayusername: registeredUser.displayusername,
    userid: registeredUser.userid,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new ForbiddenError("Invalid username or password.");
  }

  const match = await user.comparePassword(password);
  if (!match) {
    throw new ForbiddenError("Invalid username or password.");
  }

  console.log(
    `[${new Date().toISOString()}] [INFO] ${StatusCodes.OK} ${req.method} ${
      req.originalUrl
    } - Response: ${JSON.stringify(
      {
        token: "*****",
        displayusername: user.displayusername,
        userid: user.userid,
      },
      null,
      null
    )}`
  );

  res.status(StatusCodes.OK).json({
    token: generateToken({
      userid: user.userid,
      username: user.username,
    }),
    displayusername: user.displayusername,
    userid: user.userid,
  });
};

const logout = async (req, res) => {
  console.log(
    `[${new Date().toISOString()}] [INFO] ${StatusCodes.OK} ${req.method} ${
      req.originalUrl
    } - Response: User ${req.user.username} with userid : ${
      req.user.userid
    } has logged out successfully`
  );
  res.status(200).send();
};

module.exports = {
  register,
  login,
  logout,
};
