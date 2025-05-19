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

  res.status(StatusCodes.OK).json({
    token: generateToken({
      userid: user.userid,
      displayusername: user.displayusername,
    }),
    displayusername: user.displayusername,
    userid: user.userid,
  });
};

const logout = async (req, res) => {
  res.status(200).send();
};

module.exports = {
  register,
  login,
  logout,
};
