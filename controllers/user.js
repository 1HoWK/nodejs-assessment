const { StatusCodes } = require("http-status-codes");
const {
  ForbiddenError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../errors/index");
const { generateToken, verifyToken } = require("../utils/jwt");
const User = require("../models/User");

const getProfile = async (req, res) => {
  console.log(req.user);
  const user = await User.findOne({ userid: req.user.userid });
  if (!user) {
    // not found
    throw new ForbiddenError("User not found");
  }
  const { username, displayusername, userid } = user;
  res.status(StatusCodes.OK).json({ username, displayusername, userid });
};

const updateProfile = async (req, res) => {};

module.exports = {
  getProfile,
  updateProfile,
};
