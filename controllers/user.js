const { StatusCodes } = require("http-status-codes");
const {
  ForbiddenError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../errors/index");
const User = require("../models/User");

const getProfile = async (req, res) => {
  const user = await User.findOne({ userid: req.user.userid });
  if (!user) {
    throw new ForbiddenError("User not found");
  }
  const { username, displayusername, userid } = user;
  console.log(
    `[${new Date().toISOString()}] [INFO] ${req.method} ${
      req.originalUrl
    } from user ${username}`
  );
  res.status(StatusCodes.OK).json({
    username,
    displayusername,
    userid,
  });
};

const updateProfile = async (req, res) => {
  const {
    body: { displayusername, timestamp },
    user: { userid },
  } = req;
  // const { displayusername, timestamp } = req.body;
  if (displayusername === "") {
    throw new BadRequestError("displayusername cannot be blank");
  }
  // findOneAndUpdate(filter, update, options)
  const user = await User.findOneAndUpdate(
    { userid: userid },
    { displayusername: displayusername },
    { runValidators: true }
  );
  if (!user) {
    throw new ForbiddenError("User not found");
  }
  console.log(
    `[${new Date().toISOString()}] [INFO] User ${
      user.username
    }'s profile has updated successfully`
  );
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getProfile,
  updateProfile,
};
