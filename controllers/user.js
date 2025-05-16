const { StatusCodes } = require("http-status-codes");
const { ForbiddenError, BadRequestError } = require("../errors/index");
const { generateToken, verifyToken } = require("../utils/jwt");
const User = require("../models/User");

const getProfile = async (req, res) => {
  console.log(req.user);
  const user = await User.findOne({ userid: req.user.userid });
  if (!user) {
    throw new ForbiddenError("Fordbidden");
  }
  const { username, displayusername, userid } = user;
  res.status(StatusCodes.OK).json({ username, displayusername, userid });
};

const updateProfile = async (req, res) => {};

module.exports = {
  getProfile,
  updateProfile,
};
